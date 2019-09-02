import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { message, Modal, Col, Row, Form, Button, Input } from "antd";
import StandardTable, {
  StandardTableProps,
  StandardTableColumnProps,
  TableListPagination,
  TableListData,
  TableListParams
} from "components/StandardTable";
import { FormComponentProps } from "antd/es/form";
import { SorterResult } from "antd/es/table";
import * as InterfaceService from "../../../Interface/Service";
import errorCapture from "utils/errorCapture";
const FormItem = Form.Item;

export type Mode = "add" | "edit" | "read";
interface Props extends FormComponentProps {}
interface State {
  visible: boolean;
  loading: boolean;
  formValues: { [key: string]: string };
  selectedRows: any[];
  tableData: StandardTableProps<any>["data"];
}

/** 选择接口弹窗 */
@observer
export class SelectInterfaceModal extends Component<Props, State> {
  readonly state: State = {
    visible: false,
    loading: false,
    formValues: {},
    selectedRows: [],
    tableData: {
      list: [
        // { id: 1, name: "首页查询", remark: "233", controllerName: "home", url: "/", method: "GET", authType: 2 }
      ],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      }
    }
  };

  get params() {
    const {
      formValues,
      tableData: { pagination, sorterResult }
    } = this.state;
    const params: { [key: string]: any } = {
      ...formValues,
      ...(pagination || {})
    };
    params.page = params.current;
    if (sorterResult && sorterResult.field) {
      params.orderBy = `${sorterResult.field}:${sorterResult.order === "descend" ? "DESC" : "ASC"}`;
    }
    return params;
  }

  fnSuccess = (selectedIds: string[]) => {};

  show = (fnSuccess: (selectedIds: string[]) => void) => {
    this.fnSuccess = fnSuccess;
    this.setState(
      {
        visible: true
      },
      () => {}
    );
    this.getData();
  };

  hide = () => {
    this.setState({ visible: false, selectedRows: [] });
    this.handleFormReset();
  };

  handleOk = () => {
    this.fnSuccess(this.state.selectedRows.map(v => v.id));
    this.hide();
  };

  handleSelectRows = (rows: any[]) => {
    this.setState({
      selectedRows: rows
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      selectedRows: []
    });
  };

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: { [key: string]: string[] },
    sorter: SorterResult<any>
  ) => {
    console.log("handleStandardTableChange", { pagination, filtersArg, sorter });
    const getValue = (obj: any) =>
      Object.keys(obj)
        .map(key => obj[key])
        .join(",");
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj: any = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    this.setState(
      {
        tableData: {
          list: this.state.tableData.list,
          pagination,
          sorterResult: {
            columnKey: sorter.columnKey,
            field: sorter.field,
            order: sorter.order
          }
        }
      },
      () => {
        this.getData();
      }
    );
  };

  getData = async (params?: any) => {
    if (!params) {
      params = this.params;
    }
    console.log("getData params", params);
    const {
      tableData: { pagination }
    } = this.state;
    this.setState({ loading: true });
    const [error, resp] = await errorCapture(InterfaceService.getRows(params));
    this.setState({ loading: false });
    if (error) {
      return;
    }
    this.setState({
      tableData: {
        ...this.state.tableData,
        list: resp.list,
        pagination: pagination && {
          ...pagination,
          total: resp.totalCount,
          current: params.current || 1
        }
      }
    });
  };

  handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
      };
      const pagination = this.state.tableData.pagination;
      this.setState({
        formValues: values
      });
      const params: any = {
        ...values
      };
      if (pagination) {
        params.page = 1;
        params.pageSize = pagination.pageSize || 10;
      }
      this.getData(params);
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键词">{getFieldDecorator("keyword")(<Input placeholder="请输入名称、简介、控制器名或url" />)}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" htmlType="submit" loading={this.state.loading}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} loading={this.state.loading} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const columns: StandardTableColumnProps[] = [
      {
        title: "名称",
        dataIndex: "name"
      },
      {
        title: "简介",
        dataIndex: "remark"
      },
      {
        title: "控制器名称",
        dataIndex: "controllerName"
      },
      {
        title: "url",
        dataIndex: "url"
      },
      {
        title: "method",
        dataIndex: "method"
      },
      {
        title: "认证方式",
        dataIndex: "authType",
        render: text => {
          return text === 2 ? "授权访问" : "公开";
        }
      }
    ];
    return (
      <Modal
        title={"选择接口"}
        visible={this.state.visible}
        forceRender
        destroyOnClose
        onOk={this.handleOk}
        wrapClassName=""
        onCancel={this.hide}
        width={"80%"}
      >
        <div className="tableList">
          <div className="tableListForm" style={{ marginBottom: 16 }}>
            {this.renderSimpleForm()}
          </div>
          <StandardTable
            selectedRows={this.state.selectedRows}
            loading={this.state.loading}
            data={this.state.tableData}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Modal>
    );
  }
}

export default Form.create<Props>()(SelectInterfaceModal);

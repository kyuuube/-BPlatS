import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import history from "routes/history";
import { Link, RouteComponentProps } from "react-router-dom";
import { Layout, Breadcrumb, Button, Col, Divider, Form, Input, Row, Select, message, Alert, Modal } from "antd";
import { FormComponentProps } from "antd/es/form";
import StandardTable, {
  StandardTableProps,
  StandardTableColumnProps,
  TableListPagination,
  TableListData,
  TableListParams
} from "components/StandardTable";
import { SorterResult } from "antd/es/table";
import EditModal from "./components/EditModal";
import userStore from "stores/userStore";
import errorCapture from "utils/errorCapture";
import * as Service from "./Service";
import rightStore from "stores/rightStore";
const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;
const hasRight = (code: string) => rightStore.hasRight("interface", code);

interface Props extends FormComponentProps, RouteComponentProps {
  isSelectMode?: boolean;
}
interface State {
  loading: boolean;
  expandForm: boolean;
  formValues: { [key: string]: string };
  selectedRows: any[];
  tableData: StandardTableProps<any>["data"];
}

/**
 * @name 接口管理
 */
@observer
class InterfacePage extends Component<Props, State> {
  editModal?: EditModal;
  readonly state: State = {
    loading: false,
    expandForm: false,
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

  componentDidMount() {
    let { formValues, pagination, sorterResult } = this.props.location.state || ({} as any);
    formValues = formValues || {};
    pagination = pagination || this.state.tableData.pagination;
    this.props.form.setFieldsValue(formValues);
    this.setState({ formValues, tableData: { list: [], pagination, sorterResult } }, () => {
      this.getData();
    });
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState(
      {
        formValues: {},
        selectedRows: []
      },
      () => {
        this.handleSearch();
      }
    );
  };

  handleSelectRows = (rows: any[]) => {
    this.setState({
      selectedRows: rows
    });
  };

  handleSearch = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const newState: any = {
        formValues: fieldsValue,
        selectedRows: []
      };
      const { tableData } = this.state;
      if (tableData.pagination) {
        newState.tableData = {
          ...tableData,
          pagination: {
            ...tableData.pagination,
            current: 1
          }
        };
      }
      this.setState(newState, () => {
        this.getData();
      });
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

  deleteRow = (id: string) => {
    Modal.confirm({
      title: "确认删除？",
      content: "删除后不能恢复",
      okText: "确认",
      cancelText: "取消",
      maskClosable: true,
      onOk: async () => {
        this.setState({ loading: true });
        const [error, resp] = await errorCapture(Service.deleteRow(id));
        this.setState({ loading: false });
        if (error) {
          return;
        }
        message.success("删除成功");
        this.handleSearch();
      }
    });
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
    const [error, resp] = await errorCapture(Service.getRows(params));
    this.setState({ loading: false });
    if (error) {
      return;
    }
    this.setState(
      {
        tableData: {
          ...this.state.tableData,
          list: resp.list,
          pagination: pagination && {
            ...pagination,
            total: resp.totalCount,
            current: params.current || 1
          }
        }
      },
      () => {
        history.replace(this.props.location.pathname, {
          formValues: this.state.formValues,
          pagination: this.state.tableData.pagination,
          sorterResult: this.state.tableData.sorterResult
        });
      }
    );
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="关键词">{getFieldDecorator("keyword")(<Input placeholder="请输入名称、简介、控制器名或url" />)}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" loading={this.state.loading} onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} loading={this.state.loading} onClick={this.handleFormReset}>
                重置
              </Button>
              {/* <a style={{ marginLeft: 8 }} loading={this.state.loading} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    return <div />;
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
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
      },
      {
        title: "操作",
        render: (text, record) => (
          <>
            {hasRight("edit") && (
              <>
                <a onClick={() => this.editModal!.show("edit", record.id)}>修改</a>
                <Divider type="vertical" />
              </>
            )}
            {hasRight("delete") && (
              <>
                <a onClick={() => this.deleteRow(record.id)}>删除</a>
                <Divider type="vertical" />
              </>
            )}
            <a onClick={() => this.editModal!.show("read", record.id)}>详情</a>
          </>
        )
      }
    ];

    return (
      <Layout className="page InterfacePage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>接口管理</Breadcrumb.Item>
        </Breadcrumb>
        <Alert style={{ marginBottom: 15 }} message="该页面仅限开发人员使用" type="info" />
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <div className="tableList">
            <div className="tableListForm">{this.renderForm()}</div>
            <div className="tableListOperator">
              {hasRight("add") && (
                <Button icon="plus" type="primary" loading={this.state.loading} onClick={() => this.editModal!.show("add")}>
                  新建
                </Button>
              )}
            </div>
            <StandardTable
              selectedRows={this.props.isSelectMode ? this.state.selectedRows : undefined}
              loading={this.state.loading}
              data={this.state.tableData}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
          <EditModal ref={(ref: any) => (this.editModal = ref)} fnSuccess={this.getData} />
        </Content>
      </Layout>
    );
  }
}
export default Form.create<Props>()(InterfacePage);

import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Layout, Breadcrumb, Button, Col, Divider, Form, Icon, Input, Row, Select, message, Modal, Tag, Alert } from "antd";
import { FormComponentProps } from "antd/es/form";
import StandardTable, { StandardTableProps, StandardTableColumnProps } from "components/StandardTable";
import EditModal from "./components/EditModal";
import * as Service from "./Service";
import errorCapture from "utils/errorCapture";
import rightStore from "stores/rightStore";
const hasRight = (code: string) => rightStore.hasRight("menu", code);

const { Content } = Layout;
const FormItem = Form.Item;
const { Option } = Select;

interface Props extends FormComponentProps, RouteComponentProps {}
interface State {
  loading: boolean;
  expandForm: boolean;
  formValues: { [key: string]: string };
  selectedRows: any[];
  tableData: StandardTableProps<any>["data"];
}

/**
 * @name 菜单管理
 */
@observer
class MenuPage extends Component<Props, State> {
  editModal?: EditModal;
  readonly state: State = {
    loading: false,
    expandForm: false,
    formValues: {},
    selectedRows: [],
    tableData: {
      list: [
        // {
        //   id: string
        //   /** 别名：新增 */
        //   name: string;
        //   fullName: string;
        //   /** 英文标记, eg: home */
        //   code: string;
        //   /** 简介 */
        //   remark: string;
        //   /** 父菜单id，第一层为0 */
        //   parentId: string;
        //   /** 序号 */
        //   sequence: number;
        //   url: string;
        //   children: any[];
        // }
      ],
      pagination: false
    }
  };

  componentDidMount() {
    this.getData();
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

  getData = async () => {
    this.setState({ loading: true });
    const [error, resp] = await errorCapture(Service.getRows());
    this.setState({ loading: false });
    if (error) {
      return;
    }
    this.setState({
      tableData: {
        ...this.state.tableData,
        list: resp.list
      }
    });
  };

  changeSequence = async (id: string, sequence: number) => {
    this.setState({ loading: true });
    const [error, resp] = await errorCapture(Service.updateMenuSequence(id, sequence));
    this.setState({ loading: false });
    if (error) {
      return;
    }
    message.success("修改成功");
    this.handleSearch();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" loading={this.state.loading} onClick={this.handleSearch}>
                查询
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
        title: "code",
        dataIndex: "code"
      },
      {
        title: "url",
        dataIndex: "url"
      },
      // {
      //   title: "权限",
      //   dataIndex: "rights",
      //   render: (text, record) => {
      //     return (
      //       <div style={{ maxWidth: 300, lineHeight: "30px" }}>
      //         {text &&
      //           text.map((v: any) => (
      //             <Tag key={v.id} color="#87d068" visible closable={false}>
      //               {v.name}
      //             </Tag>
      //           ))}
      //       </div>
      //     );
      //   }
      // },
      // {
      //   title: "序号",
      //   dataIndex: "sequence"
      // },
      {
        title: "排序",
        dataIndex: "",
        render: (text, record) =>
          hasRight("add") && (
            <>
              <a>
                <Icon type="caret-up" onClick={() => this.changeSequence(record.id, -1)} />
              </a>
              <Divider type="vertical" />
              <a>
                <Icon type="caret-down" onClick={() => this.changeSequence(record.id, 1)} />
              </a>
            </>
          )
      },
      {
        title: "操作",
        render: (text, record) => (
          <>
            {hasRight("add") && (
              <>
                <a onClick={() => this.editModal!.show("add", record.id)}>新增</a>
                <Divider type="vertical" />
              </>
            )}
            {hasRight("edit") && (
              <>
                <a onClick={() => this.editModal!.show("edit", record.id)}>修改</a> <Divider type="vertical" />
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
      <Layout className="page MenuPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Alert message="没有在此列表定义的菜单子项，会默认为在前端显示，并排在末尾" style={{ marginBottom: 20 }} />
          <div className="tableList">
            <div className="tableListForm">{this.renderForm()}</div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" loading={this.state.loading} onClick={() => this.editModal!.show("add", "0")}>
                新增
              </Button>
            </div>
            <StandardTable
              // selectedRows={this.state.selectedRows}
              loading={this.state.loading}
              data={this.state.tableData}
              columns={columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
          <EditModal ref={(ref: any) => (this.editModal = ref)} fnSuccess={this.getData} />
        </Content>
      </Layout>
    );
  }
}
export default Form.create<Props>()(MenuPage);

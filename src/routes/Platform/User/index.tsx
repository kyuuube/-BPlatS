import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import history from "routes/history";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb, Button, Col, Divider, Form, Input, Row, Select, message, Modal, Dropdown, Menu, Icon, Tag } from "antd";
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
import rightStore from "stores/rightStore";
import * as Service from "./Service";
import errorCapture from "utils/errorCapture";
import moment from "moment";
import ChangeUserRoleModal from "./components/ChangeUserRoleModal";
import CreateUserModal from "./components/CreateUserModal";
import ResetPasswordModal from "./components/ResetPasswordModal";
const hasRight = (code: string) => rightStore.hasRight("user", code);

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
@observer
class UserPage extends Component<Props, State> {
  editModal?: EditModal;
  changeUserRoleModal?: ChangeUserRoleModal;
  createUserModal?: CreateUserModal;
  resetPasswordModal?: ResetPasswordModal;
  readonly state: State = {
    loading: false,
    expandForm: false,
    formValues: {},
    selectedRows: [],
    tableData: {
      list: [],
      pagination: { total: 0, current: 1, pageSize: 10 }
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

  toggleStatus = async (record: any) => {
    this.setState({ loading: true });
    const [error, resp] = await errorCapture(Service.updateUserStatus(record.id, !record.status));
    this.setState({ loading: false });
    if (error) {
      return;
    }
    message.success("修改成功");
    this.getData();
  };

  changeUserRole = (record: any) => {
    this.changeUserRoleModal!.show(record.id, record.roles.map(v => v.id));
  };

  resetUserPassword = (userId: string) => {
    this.resetPasswordModal!.show(userId);
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="关键词">{getFieldDecorator("keyword")(<Input placeholder="用户名、手机号、别名" />)}</FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator("status")(
                <Select placeholder="请选择" style={{ width: "100%" }} allowClear>
                  <Option value={0}>禁用</Option>
                  <Option value={1}>正常</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" loading={this.state.loading} onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} loading={this.state.loading} onClick={this.handleFormReset}>
                重置
              </Button>
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    return null;
    // const {
    //   form: { getFieldDecorator }
    // } = this.props;
    // return (
    //   <Form layout="inline">
    //     <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
    //       <Col md={8} sm={24}>
    //         <FormItem label="规则名称">{getFieldDecorator("name")(<Input placeholder="请输入" />)}</FormItem>
    //       </Col>
    //     </Row>
    //     <div style={{ overflow: "hidden" }}>
    //       <div style={{ float: "right", marginBottom: 24 }}>
    //         <Button type="primary"  loading={this.state.loading} onClick={this.handleSearch}>
    //           查询
    //         </Button>
    //         <Button style={{ marginLeft: 8 }}  loading={this.state.loading} onClick={this.handleFormReset}>
    //           重置
    //         </Button>
    //         <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
    //           收起 <Icon type="up" />
    //         </a>
    //       </div>
    //     </div>
    //   </Form>
    // );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const sorterResult = this.state.tableData.sorterResult;
    const columns: StandardTableColumnProps[] = [
      {
        title: "用户名",
        dataIndex: "username",
        sorter: true,
        sortOrder: sorterResult && sorterResult.columnKey === "username" && sorterResult.order
      },
      {
        title: "别名",
        dataIndex: "alias"
      },
      {
        title: "手机号",
        dataIndex: "phone"
      },
      {
        title: "角色",
        dataIndex: "roles",
        render: (roles: any) => {
          return roles && roles.map(v => v.name).join("，");
        }
      },
      {
        title: "注册时间",
        dataIndex: "createdAt",
        sorter: true,
        sortOrder: sorterResult && sorterResult.columnKey === "createdAt" && sorterResult.order,
        render: text => {
          return moment(text).format("YYYY/MM/DD HH:mm");
        }
      },
      {
        title: "状态",
        dataIndex: "status",
        render: text => {
          return text ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>;
        }
      },
      {
        title: "操作",
        render: (text, record) => (
          <>
            {hasRight("edit") && (
              <>
                <a
                  onClick={() => {
                    this.editModal!.show("edit", record.id);
                  }}
                >
                  修改
                </a>{" "}
                <Divider type="vertical" />
              </>
            )}
            <a onClick={() => this.editModal!.show("read", record.id)}>详情</a>
            <Divider type="vertical" />
            <Dropdown
              overlay={
                <Menu>
                  {hasRight("updateUserStatus") && (
                    <Menu.Item onClick={() => this.toggleStatus(record)}>{record.status ? "禁用" : "解除禁用"}</Menu.Item>
                  )}
                  {hasRight("updateUserRole") && <Menu.Item onClick={() => this.changeUserRole(record)}>分配角色</Menu.Item>}
                  {hasRight("delete") && <Menu.Item onClick={() => this.deleteRow(record.id)}>删除</Menu.Item>}
                  {hasRight("updateUserPassword") && <Menu.Item onClick={() => this.resetUserPassword(record.id)}>重设密码</Menu.Item>}
                </Menu>
              }
            >
              <a>
                更多 <Icon type="down" />
              </a>
            </Dropdown>
          </>
        )
      }
    ];
    return (
      <Layout className="page User" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
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
                <Button icon="plus" type="primary" loading={this.state.loading} onClick={() => this.createUserModal!.show()}>
                  新建
                </Button>
              )}
            </div>
            <StandardTable
              // selectedRows={this.state.selectedRows}
              loading={this.state.loading}
              data={this.state.tableData}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
          <EditModal ref={(ref: any) => (this.editModal = ref)} fnSuccess={this.getData} />
          <ChangeUserRoleModal ref={(ref: any) => (this.changeUserRoleModal = ref)} fnSuccess={this.getData} />
          <CreateUserModal ref={(ref: any) => (this.createUserModal = ref)} fnSuccess={this.getData} />
          <ResetPasswordModal ref={(ref: any) => (this.resetPasswordModal = ref)} fnSuccess={this.getData} />
        </Content>
      </Layout>
    );
  }
}
export default Form.create<Props>()(UserPage);

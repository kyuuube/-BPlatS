import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb, Button, Form, Input, message, Card, Table, Checkbox, Select } from "antd";
import { ColumnProps } from "antd/es/table";
import { FormComponentProps } from "antd/es/form";
import { RouteComponentProps } from "react-router";
import { parse } from "query-string";
import * as Service from "../Service";
import * as RightService from "../../Right/Service";
import errorCapture from "utils/errorCapture";
import * as MenuService from "../../Menu/Service";
import { roleTypes } from "../Type";
import history from "routes/history";
const { Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

type Query = {
  id?: string;
  mode?: Mode;
};
type PathParamsType = {};
type Mode = "read" | "add" | "edit";
interface Props extends FormComponentProps, RouteComponentProps<PathParamsType> {}
interface State {
  loading: boolean;
  uploading: boolean;
  mode: Mode;
  id: string;
  menus: any[];
  // 全部权限ids
  allRightIds: string[];
  // 选中权限ids
  checkRightIds: string[];
}

/**
 * @name 角色管理-详情
 * @description 超级管理员是默认满权限
 * @param id string 路由参数-角色id
 * @query mode string 路由参数-编辑模式
 */
class RoleDetailPage extends Component<Props, State> {
  readonly state: State = {
    loading: false,
    uploading: false,
    mode: "read",
    id: "",
    menus: [
      // {
      //   id: 1,
      //   name: "233",
      //   rights: [{ id: 1, name: "查看" }, { id: 2, name: "编辑" }]
      // }
    ],
    allRightIds: [],
    checkRightIds: []
  };

  componentDidMount() {
    console.log("params", this.props.match.params);
    const query: Query = parse(this.props.location.search);
    console.log("query", query);
    const mode = query.mode || "read";
    const id = query.id || "";
    this.setState({ mode, id, loading: true }, async () => {
      await this.getMenus();
      await this.getAllRights();
      if (mode !== "add") {
        await this.getData();
      }
      this.setState({ loading: false });
    });
  }

  getAllRights = async () => {
    const [error, resp] = await errorCapture(RightService.getRows({ pageSize: 9999999 }));
    if (error) {
      return;
    }
    this.setState({ allRightIds: resp.list.map(v => v.id) });
  };

  getData = async () => {
    const [error, resp] = await errorCapture(Service.getRowDetail(this.state.id));
    if (error) {
      return;
    }
    this.props.form.setFieldsValue(resp);
    if (resp.rights) {
      this.setState({
        checkRightIds: resp.rights.map((v: any) => v.id)
      });
    }
  };

  getMenus = async () => {
    const [error, resp] = await errorCapture(MenuService.getRows(true));
    if (error) {
      return;
    }
    this.setState({
      menus: resp.list
    });
  };

  submit = async () => {
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ uploading: true });
        values.id = this.state.id;
        values.rightIds = this.state.checkRightIds;
        let promise = this.state.mode === "edit" ? Service.updateRow(values) : Service.addRow(values);
        const [error, resp] = await errorCapture(promise);
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("保存成功");
        history.goBack();
      }
    });
  };

  handleChangeRight = (rightId: string, checked: boolean) => {
    const checkRightIds = this.state.checkRightIds.concat();
    if (checked) {
      checkRightIds.push(rightId);
    } else {
      const index = checkRightIds.indexOf(rightId);
      checkRightIds.splice(index, 1);
    }
    this.setState({ checkRightIds });
    console.log("checkRightIds", checkRightIds);
  };

  /** 设置全选 */
  setAllChecked = () => {
    this.setState({ checkRightIds: this.state.allRightIds.concat() });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props;
    const { uploading, loading, menus, mode } = this.state;
    const isRead = mode === "read";
    let title = "角色";
    switch (mode) {
      case "add":
        title = "新增" + title;
        break;
      case "edit":
        title = "编辑" + title;
        break;
      default:
        title = "查看" + title;
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };

    const columns: ColumnProps<any>[] = [
      {
        title: "名称",
        dataIndex: "name"
      },
      {
        title: "权限",
        dataIndex: "rights",
        render: (text, record) => {
          const rights = record.rights || [];
          return (
            <>
              {rights.map((v: any) => (
                <Checkbox
                  key={v.id}
                  checked={this.state.checkRightIds.includes(v.id)}
                  onChange={e => this.handleChangeRight(v.id, e.target.checked)}
                  disabled={mode === "read"}
                >
                  {v.name}
                </Checkbox>
              ))}
            </>
          );
        }
      }
    ];

    return (
      <Layout className="page RoleDetailPage">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/system/role">角色管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            // background: "#fff",
            // padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Card title="内容">
            <Form hideRequiredMark style={{ marginTop: 8 }}>
              <FormItem label="名称" {...formItemLayout}>
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "该输入项为必输项" }]
                })(<Input />)}
              </FormItem>
              <FormItem label="简介" {...formItemLayout}>
                {getFieldDecorator("remark", {
                  rules: []
                })(<Input />)}
              </FormItem>
              <FormItem label="类型" {...formItemLayout}>
                {getFieldDecorator("type", {
                  rules: [{ required: true, message: "该输入项为必输项" }],
                  initialValue: ""
                })(
                  <Select placeholder="角色类型" allowClear>
                    {roleTypes.map(v => (
                      <Option key={v.value} value={v.value}>
                        {v.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Form>
          </Card>

          <Card title={"权限"} style={{ marginTop: 20 }} extra={!isRead ? <a onClick={this.setAllChecked}>全选</a> : null}>
            {!!menus.length && (
              <Table defaultExpandAllRows rowKey="id" pagination={false} loading={loading} columns={columns} dataSource={menus} />
            )}
          </Card>
        </Content>
        {!isRead && (
          <div className="bottomBtns">
            <Button type="primary" loading={uploading} onClick={this.submit}>
              保存
            </Button>
          </div>
        )}
      </Layout>
    );
  }
}
export default Form.create<Props>()(RoleDetailPage);

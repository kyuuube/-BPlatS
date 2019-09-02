import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb, Button, Form, Input, message, Card, Switch } from "antd";
import { FormComponentProps } from "antd/es/form";
import * as Service from "./Service";
import errorCapture from "utils/errorCapture";
import rightStore from "stores/rightStore";
const hasRight = (code: string) => rightStore.hasRight("config", code);

const { Content } = Layout;

interface Props extends FormComponentProps, RouteComponentProps {}
interface State {
  loading: boolean;
  uploading: boolean;
  domainName: string;
  isClosed: string;
  pageKeywords: string;
  pageTitle: string;
}

@observer
class ConfigPage extends Component<Props, State> {
  readonly state: State = {
    loading: false,
    uploading: false,
    domainName: "",
    isClosed: "0",
    pageKeywords: "",
    pageTitle: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    const [error, resp] = await errorCapture(Service.getRows());
    this.setState({ loading: false });
    if (error) {
      return;
    }
    const state: any = {};
    resp.list.forEach(row => {
      state[row.code] = row.value;
    });
    this.setState(state);
  };

  saveValue = async (code: string, value: string) => {
    if (!value) {
      message.error("修改值不能为空");
      return;
    }
    this.setState({ uploading: true });
    const [error, resp] = await errorCapture(Service.updateConfigValue(code, value));
    this.setState({ uploading: false });
    if (error) {
      return;
    }
    message.success("保存成功");
    this.getData();
  };

  resetValue = async (code: string) => {
    this.setState({ uploading: true });
    const [error, resp] = await errorCapture(Service.resetConfigDefaultValue(code));
    this.setState({ uploading: false });
    if (error) {
      return;
    }
    message.success("重置成功");
    this.getData();
  };

  render() {
    const { loading, uploading } = this.state;
    return (
      <Layout className="page Config" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>配置管理</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="页面标题"
            extra={
              hasRight("edit") && (
                <Button type="link" loading={loading || uploading} onClick={() => this.saveValue("pageTitle", this.state.pageTitle)}>
                  保存
                </Button>
              )
            }
          >
            <Input value={this.state.pageTitle} onChange={e => this.setState({ pageTitle: e.target.value })} />
          </Card>

          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="页面关键字"
            extra={
              hasRight("edit") && (
                <Button type="link" loading={loading || uploading} onClick={() => this.saveValue("pageKeywords", this.state.pageKeywords)}>
                  保存
                </Button>
              )
            }
          >
            <Input value={this.state.pageKeywords} onChange={e => this.setState({ pageKeywords: e.target.value })} />
          </Card>

          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="后台系统域名"
            extra={
              hasRight("edit") && (
                <Button type="link" loading={loading || uploading} onClick={() => this.saveValue("domainName", this.state.domainName)}>
                  保存
                </Button>
              )
            }
          >
            <Input value={this.state.domainName} onChange={e => this.setState({ domainName: e.target.value })} />
          </Card>

          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="网站开关"
            extra={
              hasRight("edit") && (
                <Button type="link" loading={loading || uploading} onClick={() => this.saveValue("isClosed", this.state.isClosed)}>
                  保存
                </Button>
              )
            }
          >
            <Switch checked={this.state.isClosed === "1"} onChange={checked => this.setState({ isClosed: checked ? "1" : "0" })} />
          </Card>
        </Content>
      </Layout>
    );
  }
}
export default Form.create<Props>()(ConfigPage);

import React, { Component } from "react";
import "./style.less";
import { observer } from "mobx-react";
import { Layout, Breadcrumb, Tabs, Button } from "antd";
import { Link } from "react-router-dom";
import CommonUpload from "./components/CommonUpload";
import FormUpload from "./components/FormUpload";

import { withRouter, RouteComponentProps } from "react-router";
import history from "routes/history";
import { parse } from "query-string";
const { Content } = Layout;
const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}
interface State {
  defaultActiveKey: string;
}

/**
 * @desc 上传
 */
@observer
export default class UploadPage extends Component<Props, State> {
  readonly state: State = {
    defaultActiveKey: "1"
  };

  componentDidMount() {
    const query: any = parse(this.props.location.search);
    this.setState({
      defaultActiveKey: query.defaultActiveKey || "1"
    });
  }
  render() {
    return (
      <Layout className="page UploadPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>antd上传</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={key => history.replace("/form/Upload?defaultActiveKey=" + key)}>
            <TabPane tab="普通" key="1">
              <CommonUpload />
            </TabPane>
            <TabPane tab="form" key="2">
              <FormUpload />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}

import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb, Alert } from "antd";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const Content = Layout.Content;

interface Props {}
interface State {}

/**
 * @name 顶部进度条
 */
@observer
export default class ProgressBarPage extends Component<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <Layout className="page ProgressBarPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>顶部进度条</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Alert
            message={
              <a href="https://www.npmjs.com/package/nprogress" target="_blank">
                nprogress官网
              </a>
            }
            style={{ marginBottom: 20 }}
          />
          <Button type="primary" onClick={() => nprogress.start()} style={{ marginRight: 20 }}>
            开启
          </Button>
          <Button type="primary" onClick={() => nprogress.done()}>
            关闭
          </Button>
        </Content>
      </Layout>
    );
  }
}

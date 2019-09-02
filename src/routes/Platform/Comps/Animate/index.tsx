import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb, Alert } from "antd";
const Content = Layout.Content;

interface Props {}
interface State {}

/**
 * @name 动画
 */
@observer
export default class AnimatePage extends Component<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <Layout className="page AnimatePage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>动画</Breadcrumb.Item>
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
              <a href="https://www.react-spring.io/docs/hooks/basics" target="_blank">
                react-spring
              </a>
            }
            style={{ marginBottom: 20 }}
          />
          <Alert
            message={
              <a href="https://motion.ant.design/components/tween-one" target="_blank">
                Ant Motion
              </a>
            }
            style={{ marginBottom: 20 }}
          />
        </Content>
      </Layout>
    );
  }
}

import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb, Alert, Card } from "antd";
import Zmage from "react-zmage";

const Content = Layout.Content;
interface Props {}
interface State {}

/**
 * @name 图片全屏预览
 */
@observer
export default class PreviewImgPage extends Component<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <Layout className="page PreviewImgPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>图片全屏预览</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Card title="基础" style={{ marginBottom: 20 }}>
            <Zmage style={{ width: 200 }} src={require("./assets/1.jpg")} />
          </Card>
          <Card title="多图预览" style={{ marginBottom: 20 }}>
            <Zmage
              style={{ width: 200 }}
              src={require("./assets/2.jpg")}
              set={[
                {
                  src: require("./assets/1.jpg"),
                  alt: "图片的占位文字，作为图片的标题, 请尽量保持简短",
                  style: { borderRadius: 30 },
                  className: "testClassName"
                },
                {
                  src: require("./assets/2.jpg"),
                  alt: "图片的占位文字，作为图片的标题, 请尽量保持简短"
                }
              ]}
              defaultPage={1}
            />
          </Card>
        </Content>
      </Layout>
    );
  }
}

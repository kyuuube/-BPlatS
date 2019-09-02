import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb, Alert } from "antd";
import LazyLoad from "react-lazyload";
const Content = Layout.Content;

interface Props {}
interface State {}

/**
 * @name 懒加载组件
 */
@observer
export default class LazyloadPage extends Component<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <Layout className="page LazyloadPage" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>懒加载组件</Breadcrumb.Item>
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
              <a href="https://github.com/twobin/react-lazyload" target="_blank">
                https://github.com/twobin/react-lazyload
              </a>
            }
            style={{ marginBottom: 20 }}
          />

          <LazyLoad>
            <div>1</div>
            <img src="https://f11.baidu.com/it/u=692206326,1138141732&fm=72" />
          </LazyLoad>
          <div className="" style={{ height: 1500, background: "grey" }} />
          <LazyLoad>
            <div>2</div>
            <img src="http://img2.imgtn.bdimg.com/it/u=3782473641,810613269&fm=26&gp=0.jpg" />
          </LazyLoad>
          <LazyLoad>
            <div>3</div>
            <img src="http://img2.imgtn.bdimg.com/it/u=2803836572,935644416&fm=26&gp=0.jpg" />
          </LazyLoad>
          <LazyLoad>
            <div>4</div>
            <img src="http://img1.imgtn.bdimg.com/it/u=1523535591,811284970&fm=26&gp=0.jpg" />
          </LazyLoad>
          <LazyLoad offset={100}>
            <div>5</div>
            <img src="http://img3.imgtn.bdimg.com/it/u=1167410365,3735983382&fm=11&gp=0.jpg" />
          </LazyLoad>
        </Content>
      </Layout>
    );
  }
}

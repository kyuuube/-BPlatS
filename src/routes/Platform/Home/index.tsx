import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import userStore from "stores/userStore";
import { Link } from "react-router-dom";
import { Button, Layout, Breadcrumb } from "antd";
import errorCapture from "utils/errorCapture";
import history from "routes/history";
const { Content } = Layout;

interface Props {}
interface State {}

/**
 * @name 首页
 */
@observer
export default class Home extends Component<Props, State> {
  readonly state: State = {};

  getData = async (): Promise<number> => {
    return await new Promise((resolve, reject) => {
      resolve(233);
    });
  };

  async componentDidMount() {
    const [error, resp] = await errorCapture(this.getData());
    if (error) {
      console.log("errorCapture", error);
      return;
    }
    console.log("getData", resp);
  }

  render() {
    return (
      <Layout className="page Home" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <div>233用户名: {userStore.data.alias || userStore.data.username}</div>
          <Button type="primary" onClick={() => userStore.logout()}>
            退出
          </Button>
          <Button type="primary" onClick={() => history.push("/404")}>
            404
          </Button>
        </Content>
      </Layout>
    );
  }
}

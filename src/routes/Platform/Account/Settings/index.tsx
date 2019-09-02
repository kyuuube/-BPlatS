import React, { Component } from "react";
import "./style.less";
import { observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import history from "routes/history";
import { Button, Layout, Breadcrumb, Menu } from "antd";
import { Link } from "react-router-dom";
import BaseView from "./components/BaseView";
import SecurityView from "./components/SecurityView";
const { Content } = Layout;

type QueryType = {
  name?: string;
};
type PathParamsType = {
  id: string;
};
type SettingsStateKeys = "base" | "security" | "binding" | "notification";

interface Props extends RouteComponentProps<PathParamsType> {}
interface State {
  mode: "inline" | "horizontal";
  selectKey: SettingsStateKeys;
  list: { name: string; key: SettingsStateKeys; component: JSX.Element }[];
}

@observer
export default class AccountSettings extends Component<Props, State> {
  main: HTMLDivElement | undefined = undefined;
  readonly state: State = {
    mode: "inline",
    selectKey: "base",
    list: [
      {
        name: "基本设置",
        key: "base",
        component: <BaseView />
      },
      {
        name: "安全设置",
        key: "security",
        component: <SecurityView />
      },
      {
        name: "账号绑定（未完成）",
        key: "binding",
        component: <div>3</div>
      },
      {
        name: "新消息通知（未完成）",
        key: "notification",
        component: <div>4</div>
      }
    ]
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: "inline" | "horizontal" = "inline";
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }
      this.setState({
        mode
      });
    });
  };

  render() {
    const { mode, selectKey, list } = this.state;
    let focusComponent: JSX.Element = <></>;
    let focusName = "";
    list.forEach(v => {
      if (v.key === selectKey) {
        focusComponent = v.component;
        focusName = v.name;
      }
    });
    return (
      <Layout className="page AccountSettings" style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>个人设置</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <div
            className="main"
            ref={ref => {
              if (ref) {
                this.main = ref;
              }
            }}
          >
            <div className="leftMenu">
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}>
                {list.map(v => (
                  <Menu.Item key={v.key}>{v.name}</Menu.Item>
                ))}
              </Menu>
            </div>
            <div className="right">
              <div className="title">{focusName}</div>
              {focusComponent}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

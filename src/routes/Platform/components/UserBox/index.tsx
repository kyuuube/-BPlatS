import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import userStore from "stores/userStore";
import { Avatar, Popover, Icon, Menu } from "antd";
import { hot } from "react-hot-loader";
import history from "routes/history";

interface Props {}
interface State {}
@hot(module)
@observer
export default class UserBox extends Component<Props, State> {
  readonly state: State = {};

  render() {
    const content = (
      <Menu className="header-dropdown-menu" selectedKeys={[]}>
        <Menu.Item key="center">
          <Icon type="user" />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="setting" />
          <span onClick={() => history.push("/account/settings")}>个人设置</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={userStore.logout}>
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Popover overlayClassName="header-dropdown" placement="bottomRight" content={content} trigger="hover">
        <span className="UserBox">
          <Avatar src={userStore.data.avatar} />
          <span>{userStore.data.alias || userStore.data.username}</span>
        </span>
      </Popover>
    );
  }
}

import React, { Component } from "react";
import "./style.less";
import { message, List } from "antd";
import errorCapture from "utils/errorCapture";
import * as UserService from "services/UserService";
import userStore from "stores/userStore";
import { observer } from "mobx-react";
import { hot } from "react-hot-loader";
import ChangePasswordModal from "../ChangePasswordModal";
import SetPasswordModal from "../SetPasswordModal";
import BindPhoneModal from "../BindPhoneModal";
import ChangePhoneModal from "../ChangePhoneModal";
import BindEmailModal from "../BindEmailModal";
import UnBindEmailModal from "../UnBindEmailModal";

interface Props {}
interface State {
  loading: boolean;
  hasPassword: boolean;
}

@hot(module)
@observer
class SecurityView extends Component<Props, State> {
  changePasswordModal?: ChangePasswordModal;
  setPasswordModal?: SetPasswordModal;
  bindPhoneModal?: BindPhoneModal;
  changePhoneModal?: ChangePhoneModal;
  bindEmailModal?: BindEmailModal;
  unBindEmailModal?: UnBindEmailModal;
  readonly state: State = {
    loading: false,
    hasPassword: true
  };
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.checkHasPassword();
  };

  /** 检查是否有登录密码 */
  checkHasPassword = async () => {
    const [error, resp] = await errorCapture(UserService.checkHasPassword());
    if (error) {
      return;
    }
    this.setState({ hasPassword: resp.hasPassword });
  };

  render() {
    const { username, phone, email } = userStore.data;
    const { hasPassword } = this.state;
    const list = [
      {
        title: "账号密码",
        description: "已绑定账号：" + username,
        actions: [
          hasPassword ? (
            <a key="Modify" onClick={() => this.changePasswordModal!.show()}>
              修改密码
            </a>
          ) : (
            <a key="Set" onClick={() => this.setPasswordModal!.show()}>
              设置密码
            </a>
          )
        ]
      },
      {
        title: "密保手机",
        description: phone ? "已绑定手机：" + phone : "未绑定",
        actions: [
          phone ? (
            <a key="Modify" onClick={() => this.changePhoneModal!.show()}>
              更换手机
            </a>
          ) : (
            <a key="Set" onClick={() => this.bindPhoneModal!.show()}>
              绑定手机
            </a>
          )
        ]
      },
      // {
      //   title: "密保问题",
      //   description: "未设置密保问题，密保问题可有效保护账户安全",
      //   actions: [<a key="Set">设置</a>]
      // },
      {
        title: "备用邮箱",
        description: email ? "已绑定邮箱：" + email : "未绑定",
        actions: [
          email ? (
            <a key="Modify" onClick={() => this.unBindEmailModal!.show()}>
              解绑邮箱
            </a>
          ) : (
            <a key="Set" onClick={() => this.bindEmailModal!.show()}>
              绑定邮箱
            </a>
          )
        ]
      }
    ];
    return (
      <div className="SecurityView">
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <ChangePasswordModal ref={(ref: any) => (this.changePasswordModal = ref)} />
        <SetPasswordModal ref={(ref: any) => (this.setPasswordModal = ref)} />
        <BindPhoneModal ref={(ref: any) => (this.bindPhoneModal = ref)} />
        <ChangePhoneModal ref={(ref: any) => (this.changePhoneModal = ref)} />
        <BindEmailModal ref={(ref: any) => (this.bindEmailModal = ref)} />
        <UnBindEmailModal ref={(ref: any) => (this.unBindEmailModal = ref)} />
      </div>
    );
  }
}

export default SecurityView;

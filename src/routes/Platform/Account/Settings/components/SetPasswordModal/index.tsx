import React, { Component } from "react";
import { message, Modal, Input } from "antd";
import * as UserService from "services/UserService";
import errorCapture from "utils/errorCapture";

interface Props {}
interface State {
  visible: boolean;
  uploading: boolean;
  password: string;
}

/** 设置用户初始密码 */
export default class SetPasswordModal extends Component<Props, State> {
  readonly state: State = {
    visible: false,
    uploading: false,
    password: ""
  };

  show = () => {
    this.setState(
      {
        visible: true
      },
      () => {}
    );
  };

  getData = async () => {};

  hide = () => {
    this.setState({ visible: false, uploading: false });
  };

  handleOk = async () => {
    if (!this.state.password) {
      message.error("请输入密码");
      return;
    }
    this.setState({ uploading: true });
    const [error, resp] = await errorCapture(UserService.setUserInitailPassword(this.state.password));
    this.setState({ uploading: false });
    if (error) {
      return;
    }
    message.success("修改成功");
    this.hide();
  };

  render() {
    const { visible, uploading } = this.state;
    return (
      <Modal
        title={"设置初始密码"}
        visible={visible}
        forceRender
        destroyOnClose
        onOk={this.handleOk}
        wrapClassName=""
        confirmLoading={uploading}
        onCancel={this.hide}
      >
        <Input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
      </Modal>
    );
  }
}

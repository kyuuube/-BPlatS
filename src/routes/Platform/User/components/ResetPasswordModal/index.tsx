import React, { Component } from "react";
import { message, Modal, Input } from "antd";
import * as Service from "../../Service";
import errorCapture from "utils/errorCapture";

interface Props {
  fnSuccess: () => void;
}
interface State {
  visible: boolean;
  uploading: boolean;
  userId: string;
  password: string;
}

/**  重置用户密码 */
export default class ResetPasswordModal extends Component<Props, State> {
  readonly state: State = {
    visible: false,
    uploading: false,
    userId: "",
    password: ""
  };

  show = (userId: string = "") => {
    this.setState(
      {
        visible: true,
        userId
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
    const [error, resp] = await errorCapture(Service.resetUserPassword(this.state.userId, this.state.password));
    this.setState({ uploading: false });
    if (error) {
      return;
    }
    message.success("修改成功");
    this.props.fnSuccess();
    this.hide();
  };

  render() {
    const { visible, uploading } = this.state;
    return (
      <Modal
        title={"重置用户密码"}
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

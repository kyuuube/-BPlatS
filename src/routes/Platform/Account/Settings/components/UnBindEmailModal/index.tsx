import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import EditForm from "./EditForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import errorCapture from "utils/errorCapture";
import * as UserService from "services/UserService";
import userStore from "stores/userStore";

interface Props {}
interface State {
  visible: boolean;
  uploading: boolean;
}

/** 解绑邮箱弹窗 */
export default class UnBindEmailModal extends Component<Props, State> {
  editForm?: WrappedFormUtils;
  readonly state: State = {
    visible: false,
    uploading: false
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

  handleOk = () => {
    this.editForm!.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ uploading: true });
        const [error, resp] = await errorCapture(UserService.unBindEmail(values.emailCode));
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("解绑成功");
        userStore.getUserData();
        this.hide();
      }
    });
  };

  render() {
    const { visible, uploading } = this.state;
    return (
      <Modal
        title="解绑邮箱"
        visible={visible}
        forceRender
        // destroyOnClose
        onOk={this.handleOk}
        wrapClassName=""
        confirmLoading={uploading}
        onCancel={this.hide}
      >
        {visible && <EditForm ref={(ref: any) => (this.editForm = ref)} {...this.props} />}
      </Modal>
    );
  }
}

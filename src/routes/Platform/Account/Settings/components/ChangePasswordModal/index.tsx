import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import EditForm from "./EditForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import errorCapture from "utils/errorCapture";
import * as UserService from "services/UserService";

interface Props {}
interface State {
  visible: boolean;
  uploading: boolean;
}

/** 修改密码弹窗 */
export default class ChangePasswordModal extends Component<Props, State> {
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
        const [error, resp] = await errorCapture(UserService.changeUserPassword(values.oldPassword, values.newPassword));
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("修改成功");
        this.hide();
      }
    });
  };

  render() {
    const { visible, uploading } = this.state;
    return (
      <Modal
        title="修改密码"
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

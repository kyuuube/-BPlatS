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

/** 绑定手机弹窗 */
export default class BindPhoneModal extends Component<Props, State> {
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
        const [error, resp] = await errorCapture(UserService.bindPhone(values.phone, values.phoneCode));
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("绑定成功");
        userStore.getUserData();
        this.hide();
      }
    });
  };

  render() {
    const { visible, uploading } = this.state;
    return (
      <Modal
        title="绑定手机"
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

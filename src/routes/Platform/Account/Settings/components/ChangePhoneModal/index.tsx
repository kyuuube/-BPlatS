import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import EditForm1 from "./EditForm1";
import EditForm2 from "./EditForm2";
import { WrappedFormUtils } from "antd/lib/form/Form";
import errorCapture from "utils/errorCapture";
import * as UserService from "services/UserService";
import userStore from "stores/userStore";

interface Props {}
interface State {
  visible: boolean;
  uploading: boolean;
  progressIndex: number;
}

/** 修改绑定手机弹窗 */
export default class ChangePhoneModal extends Component<Props, State> {
  editForm1?: WrappedFormUtils;
  editForm2?: WrappedFormUtils;
  readonly state: State = {
    visible: false,
    uploading: false,
    progressIndex: 0
  };
  oldPhoneCode = "";

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
    this.setState({ visible: false, uploading: false, progressIndex: 0 });
  };

  handleOk = () => {
    this.editForm2!.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ uploading: true });
        const [error, resp] = await errorCapture(UserService.updatePhone(this.oldPhoneCode, values.phone, values.phoneCode));
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("更换成功");
        userStore.getUserData();
        this.hide();
      }
    });
  };

  next = () => {
    this.editForm1!.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.setState({ uploading: true });
        const [error, resp] = await errorCapture(UserService.checkOldPhone(values.phoneCode));
        this.oldPhoneCode = values.phoneCode;
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        this.setState({ progressIndex: 1 });
      }
    });
  };

  render() {
    const { visible, uploading, progressIndex } = this.state;
    return (
      <Modal
        title={progressIndex === 0 ? "验证旧手机号码" : "绑定新手机号码"}
        visible={visible}
        forceRender
        // destroyOnClose
        wrapClassName=""
        onCancel={this.hide}
        footer={
          <>
            {progressIndex === 0 && (
              <Button onClick={this.next} loading={uploading} type="primary">
                下一步
              </Button>
            )}
            {progressIndex === 1 && (
              <Button onClick={this.handleOk} loading={uploading} type="primary">
                提交
              </Button>
            )}
          </>
        }
      >
        {visible && progressIndex === 0 && <EditForm1 ref={(ref: any) => (this.editForm1 = ref)} {...this.props} />}
        {visible && progressIndex === 1 && <EditForm2 ref={(ref: any) => (this.editForm2 = ref)} {...this.props} />}
      </Modal>
    );
  }
}

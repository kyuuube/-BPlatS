import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import EditForm from "./EditForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as Service from "../../Service";
import errorCapture from "utils/errorCapture";

interface Props {
  fnSuccess: () => void;
}
interface State {
  visible: boolean;
  uploading: boolean;
}

/** 新建用户弹窗 */
export default class CreateUserModal extends Component<Props, State> {
  editForm?: WrappedFormUtils;
  readonly state: State = {
    visible: false,
    uploading: false
  };

  show = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({ visible: false, uploading: false });
  };

  handleOk = () => {
    this.editForm!.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ uploading: true });
        const [error, resp] = await errorCapture(Service.addRow(values.username, values.password));
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("新增用户成功");
        this.hide();
        this.props.fnSuccess();
      }
    });
  };

  render() {
    const title = "新增用户";
    let { visible, uploading } = this.state;
    return (
      <Modal
        title={title}
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

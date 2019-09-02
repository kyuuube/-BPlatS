import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import EditForm from "./EditForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as Service from "../../Service";
import errorCapture from "utils/errorCapture";

export type Mode = "edit" | "read";
interface Props {
  fnSuccess: () => void;
}
interface State {
  visible: boolean;
  uploading: boolean;
  mode: Mode;
  id: string;
}

/** 编辑用户信息弹窗，只能查看和编辑模式 */
export default class EditModal extends Component<Props, State> {
  editForm?: WrappedFormUtils;
  readonly state: State = {
    visible: false,
    uploading: false,
    mode: "read",
    id: ""
  };

  show = (mode: Mode = "read", id: string = "") => {
    this.setState(
      {
        visible: true,
        mode,
        id
      },
      () => {
        if (id) {
          // 获取后台数据
          this.getData();
        }
      }
    );
  };

  getData = async () => {
    const resp: any = await Service.getRowDetail(this.state.id);
    this.editForm!.setFieldsValue(resp);
  };

  hide = () => {
    this.setState({ visible: false, id: "", uploading: false });
  };

  handleOk = () => {
    this.editForm!.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ uploading: true });
        values.id = this.state.id;
        const [error, resp] = await errorCapture(Service.updateRow(values));
        this.setState({ uploading: false });
        if (error) {
          return;
        }
        message.success("保存成功");
        this.hide();
        this.props.fnSuccess();
      }
    });
  };

  render() {
    let title = "用户";
    let { mode, visible, uploading } = this.state;
    switch (mode) {
      case "edit":
        title = "编辑" + title;
        break;
      default:
        title = "查看" + title;
    }
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
        footer={mode === "read" ? false : undefined}
      >
        {visible && <EditForm ref={(ref: any) => (this.editForm = ref)} mode={mode} {...this.props} />}
      </Modal>
    );
  }
}

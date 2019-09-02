import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Button, message, Modal } from "antd";
import EditForm from "./EditForm";
import { WrappedFormUtils } from "antd/lib/form/Form";

export type Mode = "add" | "edit" | "read";
interface Props {
  fnSuccess: () => void;
}
interface State {
  visible: boolean;
  uploading: boolean;
  mode: Mode;
  id: string;
}

@observer
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
        if (mode === "add") {
        } else if (id) {
          // 获取后台数据
          this.editForm!.setFieldsValue({
            name: "233"
          });
        }
      }
    );
  };

  hide = () => {
    this.setState({ visible: false, id: "", uploading: false });
  };

  handleOk = () => {
    this.editForm!.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ uploading: true });
        try {
          const response: any = await new Promise(resolve => {
            resolve();
          });
          message.success("保存成功");
          this.props.fnSuccess();
          this.hide();
        } catch (error) {
          console.warn(error);
          this.setState({ uploading: false });
          message.error(error.message || error);
        }
      }
    });
  };

  render() {
    let title = "角色";
    let { mode, visible, uploading } = this.state;
    switch (mode) {
      case "add":
        title = "新增" + title;
        break;
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

import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Button, message, Modal } from "antd";
import EditForm from "./EditForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { transTreeAttrs } from "utils/filter";
import { TreeNode } from "antd/lib/tree-select";
import * as Service from "../../Service";
import * as MenuService from "../../../Menu/Service";
import errorCapture from "utils/errorCapture";

export type Mode = "add" | "edit" | "read";
interface Props {
  fnSuccess: () => void;
}
interface State {
  visible: boolean;
  uploading: boolean;
  mode: Mode;
  id: string;
  menus: TreeNode[];
}

@observer
export default class EditModal extends Component<Props, State> {
  editForm?: WrappedFormUtils;
  readonly state: State = {
    visible: false,
    uploading: false,
    mode: "read",
    id: "",
    menus: []
  };

  show = (mode: Mode = "read", id: string = "", menuId: string = "") => {
    this.setState(
      {
        visible: true,
        mode,
        id
      },
      () => {
        if (mode === "add") {
          if (menuId) {
            this.editForm!.setFieldsValue({
              menuId
            });
          }
        } else if (id) {
          // 获取后台数据
          this.getData();
        }
      }
    );
    this.getMenus();
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
        let promise = this.state.mode === "edit" ? Service.updateRow(values) : Service.addRow(values);
        const [error, resp] = await errorCapture(promise);
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

  getMenus = async () => {
    const [error, resp] = await errorCapture(MenuService.getRows());
    if (error) {
      return;
    }
    const menus = transTreeAttrs(resp.list);
    console.log("menus", menus);
    this.setState({
      menus
    });
  };

  render() {
    let title = "权限";
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
        {visible && <EditForm ref={(ref: any) => (this.editForm = ref)} mode={mode} menus={this.state.menus} {...this.props} />}
      </Modal>
    );
  }
}

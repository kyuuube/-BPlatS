import React, { Component } from "react";
import { Button, message, Modal, Checkbox } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import * as Service from "../../Service";
import * as RoleService from "../../../System/Role/Service";
import errorCapture from "utils/errorCapture";

interface Props {
  fnSuccess: () => void;
}
interface State {
  visible: boolean;
  uploading: boolean;
  userId: string;
  roleIds: string[];
  roles: CheckboxGroupProps["options"];
}

/**  修改用户绑定的角色s弹窗 */
export default class ChangeUserRoleModal extends Component<Props, State> {
  readonly state: State = {
    visible: false,
    uploading: false,
    userId: "",
    roleIds: [],
    roles: []
  };

  show = (userId: string = "", roleIds: string[]) => {
    this.setState(
      {
        visible: true,
        userId,
        roleIds
      },
      () => {}
    );
    this.getRoles();
  };

  getData = async () => {};

  hide = () => {
    this.setState({ visible: false, uploading: false, roleIds: [] });
  };

  handleOk = async () => {
    this.setState({ uploading: true });
    const [error, resp] = await errorCapture(Service.updateUserRole(this.state.userId, this.state.roleIds));
    this.setState({ uploading: false });
    if (error) {
      return;
    }
    message.success("保存成功");
    this.props.fnSuccess();
    this.hide();
  };

  getRoles = async () => {
    const [error, resp] = await errorCapture(RoleService.getRows({ pageSize: 99999 }));
    if (error) {
      return;
    }
    this.setState({
      roles: resp.list.map(v => {
        return {
          label: v.name,
          value: v.id
        };
      })
    });
  };

  render() {
    const { visible, uploading } = this.state;
    return (
      <Modal
        title={"编辑用户角色"}
        visible={visible}
        forceRender
        destroyOnClose
        onOk={this.handleOk}
        wrapClassName=""
        confirmLoading={uploading}
        onCancel={this.hide}
      >
        <Checkbox.Group
          options={this.state.roles}
          value={this.state.roleIds}
          onChange={roleIds => {
            this.setState({ roleIds: roleIds as any });
          }}
        />
      </Modal>
    );
  }
}

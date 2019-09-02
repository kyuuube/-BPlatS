import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Form, Input, TreeSelect } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Mode } from "./index";
import { TreeNode } from "antd/lib/tree-select";
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  mode: Mode;
  menus: TreeNode[];
}
interface State {}
export class EditForm extends Component<Props, State> {
  static defaultProps = {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <Form>
        <FormItem label="名称" {...formItemLayout}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="简介" {...formItemLayout}>
          {getFieldDecorator("remark", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="code" {...formItemLayout}>
          {getFieldDecorator("code", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input placeholder="eg: read edit delete add" />)}
        </FormItem>

        <FormItem label="菜单" {...formItemLayout}>
          {getFieldDecorator("menuId", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(
            <TreeSelect
              placeholder="全部"
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeDefaultExpandAll
              showSearch
              allowClear
              treeData={this.props.menus}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

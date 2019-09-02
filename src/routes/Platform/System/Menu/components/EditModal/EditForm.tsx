import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Form, Input, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Mode } from "./index";
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  mode: Mode;
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
        <FormItem label="全称" {...formItemLayout}>
          {getFieldDecorator("fullName", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="code" {...formItemLayout}>
          {getFieldDecorator("code", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input />)}
        </FormItem>

        <FormItem label="url" {...formItemLayout}>
          {getFieldDecorator("url", {
            rules: []
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

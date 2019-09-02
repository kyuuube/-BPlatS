import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Form, Input, InputNumber, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Mode } from "./index";
const FormItem = Form.Item;
const Option = Select.Option;

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
        <FormItem label="简介" {...formItemLayout}>
          {getFieldDecorator("remark", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="控制器名称" {...formItemLayout}>
          {getFieldDecorator("controllerName", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="url" {...formItemLayout}>
          {getFieldDecorator("url", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input />)}
        </FormItem>
        <FormItem label="method" {...formItemLayout}>
          {getFieldDecorator("method", {
            initialValue: "GET",
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(
            <Select>
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="认证方式" {...formItemLayout}>
          {getFieldDecorator("authType", {
            initialValue: 2,
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(
            <Select>
              <Option value={1}>公开</Option>
              <Option value={2}>授权访问</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

import React, { Component } from "react";
import { Form, Input, message, Upload, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {
  loading: boolean;
}
export class EditForm extends Component<Props, State> {
  static defaultProps = {};
  readonly state: State = {
    loading: false
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <Form>
        <FormItem label="用户名" {...formItemLayout}>
          {getFieldDecorator("username", {
            rules: []
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
          {getFieldDecorator("password", {
            rules: []
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

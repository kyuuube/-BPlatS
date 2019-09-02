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

  comparePassword = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue("newPassword") && form.getFieldValue("newPassword") !== form.getFieldValue("newPassword2")) {
      callback("新密码和校验新密码不一致");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };

    return (
      <Form>
        <FormItem label="旧密码" {...formItemLayout}>
          {getFieldDecorator("oldPassword", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input.Password />)}
        </FormItem>
        <FormItem label="新密码" {...formItemLayout}>
          {getFieldDecorator("newPassword", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(<Input.Password type="password" />)}
        </FormItem>
        <FormItem label="校验新密码" {...formItemLayout}>
          {getFieldDecorator("newPassword2", {
            rules: [
              { required: true, message: "该输入项为必输项" },
              {
                validator: this.comparePassword
              }
            ]
          })(<Input.Password />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

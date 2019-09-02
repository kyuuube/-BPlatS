import React, { Component } from "react";
import { Form, Input, message, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import SendCodeButton from "components/SendCodeButton";
import commonRegexp from "utils/commonRegexp";
import userStore from "stores/userStore";
import errorCapture from "utils/errorCapture";
import configStore from "stores/configStore";
import * as SystemService from "services/SystemService";

const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {}
export class EditForm extends Component<Props, State> {
  static defaultProps = {};
  readonly state: State = {};

  sendPhoneCode = async (phone: string) => {
    const [error, resp] = await errorCapture(SystemService.sendPhoneCode(phone, 1));
    if (error) {
      return;
    }
    message.success("发送成功");
    if (resp && resp.code && configStore.isDev) {
      // dev环境直接返回code
      this.props.form.setFieldsValue({ phoneCode: resp.code });
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const phone = getFieldValue("phone");
    return (
      <Form>
        <Form.Item label="手机号码" {...formItemLayout}>
          {getFieldDecorator("phone", {
            rules: [{ required: true, message: "请输入正确的手机", pattern: commonRegexp.mobilePhone }]
          })(<Input />)}
        </Form.Item>
        <FormItem label="手机验证码" {...formItemLayout}>
          {getFieldDecorator("phoneCode", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(
            <Input
              suffix={
                <SendCodeButton
                  disabled={!commonRegexp.mobilePhone.test(phone)}
                  onSend={() => {
                    this.sendPhoneCode(phone);
                  }}
                />
              }
              placeholder="手机验证码"
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

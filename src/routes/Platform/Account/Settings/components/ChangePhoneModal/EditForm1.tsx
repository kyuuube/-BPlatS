import React, { Component } from "react";
import { Form, Input, message, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import SendCodeButton from "components/SendCodeButton";
import commonRegexp from "utils/commonRegexp";
import errorCapture from "utils/errorCapture";
import configStore from "stores/configStore";
import * as SystemService from "services/SystemService";
import userStore from "stores/userStore";

const FormItem = Form.Item;

interface Props extends FormComponentProps {}
interface State {}
export class EditForm1 extends Component<Props, State> {
  static defaultProps = {};
  readonly state: State = {};

  sendPhoneCode = async (phone: string) => {
    const [error, resp] = await errorCapture(SystemService.sendPhoneCode(phone, 4));
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
    const phone = userStore.data.phone;
    return (
      <Form>
        <Form.Item label="旧手机号码" {...formItemLayout}>
          <Input value={phone} disabled={true} />
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

export default Form.create<Props>()(EditForm1);

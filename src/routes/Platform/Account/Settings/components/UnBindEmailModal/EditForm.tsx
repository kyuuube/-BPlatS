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

  sendEmailCode = async (eamil: string) => {
    const [error, resp] = await errorCapture(SystemService.sendEmailCode(eamil, 3));
    if (error) {
      return;
    }
    message.success("发送成功");
    if (resp && resp.code && configStore.isDev) {
      // dev环境直接返回code
      this.props.form.setFieldsValue({ emailCode: resp.code });
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const email = userStore.data.email;
    return (
      <Form>
        <Form.Item label="邮箱" {...formItemLayout}>
          <Input value={email} disabled={true} />
        </Form.Item>
        <FormItem label="邮箱验证码" {...formItemLayout}>
          {getFieldDecorator("emailCode", {
            rules: [{ required: true, message: "该输入项为必输项" }]
          })(
            <Input
              suffix={
                <SendCodeButton
                  disabled={!commonRegexp.email.test(email)}
                  onSend={() => {
                    this.sendEmailCode(email);
                  }}
                />
              }
              placeholder="邮箱验证码"
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create<Props>()(EditForm);

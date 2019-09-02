import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import userStore from "stores/userStore";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import wsCache from "utils/wsCache";
import history from "routes/history";
import commonRegexp from "utils/commonRegexp";
import SendCodeButton from "components/SendCodeButton";
import * as SystemService from "services/SystemService";
import errorCapture from "utils/errorCapture";
import configStore from "stores/configStore";

interface Props extends FormComponentProps {}
interface State {
  value: string;
  uploading: boolean;
  loginType: "account" | "phoneCode";
  imageCodeData: { imageCodeId: string; imageUrl: string };
}
@observer
class Login extends Component<Props, State> {
  readonly state: State = {
    value: "233444",
    uploading: false,
    loginType: "account",
    imageCodeData: {
      imageCodeId: "",
      imageUrl: ""
    }
  };
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (this.state.loginType === "account") {
      this.createImageCode();
    }
  }

  changeLoginType = (loginType: State["loginType"]) => {
    this.setState(
      {
        loginType
      },
      () => {
        if (loginType === "account") {
          this.createImageCode();
        }
      }
    );
  };

  sendPhoneCode = async (phone: string) => {
    const [error, resp] = await errorCapture(SystemService.sendPhoneCode(phone, 3));
    if (error) {
      return;
    }
    message.success("发送成功");
    if (resp && resp.code && configStore.isDev) {
      // dev环境直接返回code
      this.props.form.setFieldsValue({ phoneCode: resp.code });
    }
  };

  /** 获取验证码图片 */
  createImageCode = async () => {
    const [error, resp] = await errorCapture(SystemService.createImageCode());
    if (error) {
      return;
    }
    this.setState({
      imageCodeData: resp
    });
    if (resp.imageCode) {
      this.props.form.setFieldsValue({ imageCode: resp.imageCode });
    }
  };

  submit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (values.remember) {
          // 缓存token 60分钟
          console.log("缓存");
          wsCache.set("isAutoLogin", true, { exp: 30 * 24 * 60 * 60 });
        } else {
          wsCache.set("isAutoLogin", true, { exp: 60 * 60 });
        }
        const { loginType } = this.state;
        this.setState({ uploading: true });
        let promise: any;
        if (loginType === "account") {
          // 账号登录
          promise = userStore.login(values.username, values.password, this.state.imageCodeData.imageCodeId, values.imageCode);
        } else if (loginType === "phoneCode") {
          // 密码登录
          promise = userStore.loginByPhoneCode(values.phone, values.phoneCode);
        }
        const [error] = await errorCapture(promise);
        this.setState({ uploading: false });
        if (error) {
          console.log("qiuguanbin")
          this.createImageCode();
          return;
        }
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { loginType, imageCodeData } = this.state;
    const phone = getFieldValue("phone");
    console.log(phone, commonRegexp.mobilePhone.test(phone));
    return (
      <div className="page Login">
        <Form className="login-form">
          <div className="title">系统登录</div>
          {/* 账号登录 */}
          {loginType === "account" && (
            <>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名、手机或邮箱" }]
                })(<Input size="large" prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码" }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("imageCode", {
                  rules: [{ required: true, message: "请输入验证码" }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="picture" style={{ color: "rgba(0,0,0,.25)" }} />}
                    suffix={<img style={{ height: "90%" }} src={imageCodeData.imageUrl} onClick={this.createImageCode} />}
                    placeholder="验证码"
                  />
                )}
              </Form.Item>
            </>
          )}
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>自动登录</Checkbox>)}
            <a className="forget" href="">
              忘记密码
            </a>
          </Form.Item>
          <Button type="primary" className="submit" loading={this.state.uploading} onClick={this.submit}>
            登录
          </Button>
        </Form>
        <div className="bottomBox">Copyright©2019</div>
      </div>
    );
  }
}

export default Form.create()(Login);

import React, { Component } from "react";
import "./style.less";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import userStore from "stores/userStore";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import history from "routes/history";

interface Props extends FormComponentProps {}
interface State {
  uploading: boolean;
}
@observer
class Regis extends Component<Props, State> {
  readonly state: State = {
    uploading: false
  };
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (values.password !== values.password2) {
          message.error("密码和校验密码不一致");
          return;
        }
        this.setState({ uploading: true });
        await userStore.regis(values.username, values.password);
        this.setState({ uploading: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page Regis">
        <Form onSubmit={this.handleSubmit} className="Regis-form">
          <div className="title">用户注册</div>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名" }]
            })(<Input size="large" prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="用户名" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input size="large" prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password2", {
              rules: [{ required: true, message: "请输入校验密码" }]
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="校验密码"
              />
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit" className="submit">
            注册
          </Button>
          <Button type="default" className="subBtn" onClick={() => history.push("/login")}>
            前往登录
          </Button>
        </Form>
        <div className="bottomBox">Copyright©2019 xxx出品</div>
      </div>
    );
  }
}

export default Form.create()(Regis);

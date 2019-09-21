import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {RouteComponentProps} from "react-router";
import { FormComponentProps } from "antd/es/form";
import React, {Component} from "react";
import userStore from "stores/userStore";

import "./index.less"

interface Props extends RouteComponentProps, FormComponentProps {}

interface State {}

class Login extends Component<Props, State> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    submit = () => {
        this.props.form.validateFields(async (err, values) => {
             await userStore.login(values.username, values.password)
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <br/>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.submit}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create<Props>()(Login);
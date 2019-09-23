import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {RouteComponentProps} from "react-router";
import {FormComponentProps} from "antd/es/form";
import React, {Component} from "react";

import "./index.less"

interface Props extends RouteComponentProps, FormComponentProps {
}

interface State {
}

class SignUp extends Component<Props, State> {
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
            console.log(values)
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
                    <Button block type="primary" htmlType="submit" className="login-form-button" onClick={this.submit}>
                        register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create<Props>()(SignUp);

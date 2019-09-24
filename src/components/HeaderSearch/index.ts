import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {RouteComponentProps} from "react-router";
import {FormComponentProps} from "antd/es/form";
import React, {Component} from "react";

import "./index.less"

interface Props extends RouteComponentProps, FormComponentProps {
}

interface State {
}

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
            console.log(values)
        })
    }

    render() {
        return (
            "查询"
        )
    }
}

export default Form.create<Props>()(Login);

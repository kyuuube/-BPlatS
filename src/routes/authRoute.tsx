import React, { Component } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import userStore from "stores/userStore";
import { observer } from "mobx-react";

interface State {
}

/**
 * 校验登录
 */
@observer
export default class AuthRoute extends Component<RouteProps, State> {
    render() {
        console.log(userStore.logined)
        if (!userStore.logined) {
            return <Redirect path="*" to="/login" />;
        }
        return <Route {...this.props} />;
    }
}

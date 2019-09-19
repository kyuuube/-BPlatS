import React, { Component } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
// import userStore from "stores/userStore";
import { observer } from "mobx-react";

interface State {
    logined: boolean
}

/**
 * 校验登录
 */
@observer
export default class AuthRoute extends Component<RouteProps, State> {
    state: State = {
        logined: true,
    };
    render() {
        console.log(!this.state.logined)
        if (!this.state.logined) {
            return <Redirect path="*" to="/login" />;
        }
        return <Route {...this.props} />;
    }
}

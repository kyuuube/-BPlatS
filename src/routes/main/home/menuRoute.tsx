import React from "react";
// 不使用这个组件的话，视图更新一点问题都没有
// import AsynLoadable from "components/AsynLoadable";
import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "routes/main/dashboard";
import User from "routes/main/user";
// const Dashboard = AsynLoadable(() => import(/* webpackChunkName: "dashboard" */ "routes/main/dashboard"));
// const User = AsynLoadable(() => import(/* webpackChunkName: "user" */ "routes/main/user"));

export const MenuRoute = () => {
    return (
        <Switch>
            <Route path={`/`} exact component={Dashboard} />
            <Route path={`/system`} exact component={Dashboard} />
            <Route path={`/user/list`} exact component={User} />
            <Redirect path="*" to="/" />
        </Switch>
    );
};

import React from "react";
// 不使用这个组件的话，视图更新一点问题都没有
// import AsynLoadable from "components/AsynLoadable";
import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "routes/main/dashboard";
import User from "routes/main/user";
import Permission from "routes/main/system/permission";
import Role from "routes/main/system/role";
// const Dashboard = AsynLoadable(() => import(/* webpackChunkName: "dashboard" */ "routes/main/dashboard"));
// const User = AsynLoadable(() => import(/* webpackChunkName: "user" */ "routes/main/user"));

export const MenuRoute = () => {
    return (
        <Switch>
            <Route path={`/`} exact component={Dashboard} />
            <Route path={`/user/list`} exact component={User} />
            <Route path={`/system/permission`} exact component={Permission} />
            <Route path={`/system/role`} exact component={Role} />
            <Redirect path="*" to="/" />
        </Switch>
    );
};

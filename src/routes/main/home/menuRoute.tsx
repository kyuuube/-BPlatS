import React from "react";
import AsynLoadable from "components/AsynLoadable";
import { Route, Switch, Redirect } from "react-router-dom";

const Dashboard = AsynLoadable(() => import(/* webpackChunkName: "dashboard" */ "routes/main/dashboard"));
const User = AsynLoadable(() => import(/* webpackChunkName: "user" */ "routes/main/user"));

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

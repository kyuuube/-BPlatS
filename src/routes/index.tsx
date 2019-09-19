/**
 * @name 路由配置文件
 * @desc 异步加载 const Home = AsynLoadable(() => import("routes/Login"));
 * @desc 正常加载 import Home from "./Home";
 */
import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AsynLoadable from "../components/AsynLoadable";
import RootContainer from "../containers/RootContainer";
import AuthRoute from "./authRoute";
import {hot} from "react-hot-loader";

const Home = AsynLoadable(() => import(/* webpackChunkName: "home" */ "./main/home"));
const Login = AsynLoadable(() => import(/* webpackChunkName: "home" */ "./login"));


const router = (
    <Router>
        <RootContainer>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <AuthRoute path="/" component={Home}/>
                <Redirect path="*" to="/"/>
            </Switch>
        </RootContainer>
    </Router>
);

// @ts-ignore
const App = () => router;
// @ts-ignore
export default hot(module)(App);

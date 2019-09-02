/**
 * @name 路由配置文件
 * @desc 异步加载 const Home = AsynLoadable(() => import("routes/Login"));
 * @desc 正常加载 import Home from "./Home";
 */
import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import AsynLoadable from "../components/AsynLoadable";
import RootContainer from "../containers/RootContainer";
import AuthRoute from "./AuthRoute";
import { hot } from "react-hot-loader";

const Nothing = AsynLoadable(() => import(/* webpackChunkName: "404" */ "./404"));

const Login = AsynLoadable(() => import(/* webpackChunkName: "login" */ "./Login"));
const Regis = AsynLoadable(() => import(/* webpackChunkName: "Regis" */ "./Regis"));

const Platform = AsynLoadable(() => import(/* webpackChunkName: "home" */ "./Platform"));

const Home = AsynLoadable(() => import(/* webpackChunkName: "home" */ "./Platform/Home"));
const Page1 = AsynLoadable(() => import(/* webpackChunkName: "Page1" */ "./Page1"));

const router = (
  <Router history={history}>
    <RootContainer>
      <Switch>
        <Route path="/Home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/Regis" exact component={Regis} />
        <Route path="/Page1/:id" exact component={Page1} />
        <Route path="/404" exact component={Nothing} />
        <Route path="/" component={Platform} />

        <Redirect path="*" to="/" />
      </Switch>
    </RootContainer>
  </Router>
);

const App = () => router;
export default hot(module)(App);

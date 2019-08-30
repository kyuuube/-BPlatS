import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { create } from "mobx-persist";

import userStore from "./stores/userStore";
// antd组件本地化
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { ConfigProvider } from "antd";

// 日期本地化设置
import moment from "moment";
import "moment/locale/zh-cn";

const MOUNT_NODE = document.getElementById("root");
// ReactDOM.render(<App />, document.getElementById('root'));

// 封装 render
const render = (Component: JSX.Element) => {
    ReactDOM.render(Component, MOUNT_NODE);
};

const hydrate = create();
const hydrateSuccess = async () => {
    console.log("Store同步成功");
    await userStore.init();
    render(
        <ConfigProvider locale={zh_CN}>
            <App />
        </ConfigProvider>
    );
};

hydrateSuccess()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

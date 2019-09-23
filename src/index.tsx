import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes';
import * as serviceWorker from './serviceWorker';
import userStore from "stores/userStore";
import {create} from "mobx-persist";
// import wsCache from "utils/wsCache";
import globalEvents from "utils/globalEvents";
// antd组件本地化
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {ConfigProvider} from "antd";

// 日期本地化设置
import moment from "moment";
import "moment/locale/zh-cn";

const MOUNT_NODE = document.getElementById("root");
// ReactDOM.render(<App />, document.getElementById('root'));

// 封装 render
const render = () => {
    // console.log("currentLocale", currentLocale);
    // intl.init({
    //     currentLocale,
    //     locales: localMessages
    // });
    ReactDOM.render(
        <ConfigProvider locale={zh_CN}>
            <App/>
        </ConfigProvider>,
        MOUNT_NODE
    );
};

const hydrate = create();
const hydrateSuccess = async () => {
    console.log("Store同步成功", userStore);
    await userStore.init();
    render();
};


// 强制更新
globalEvents.on("forceUpdateRender", render);

// 是否自动登录
// console.log("isAutoLogin", wsCache.get("isAutoLogin"));
// if (!wsCache.get("isAutoLogin")) {
//     wsCache.delete("userStore");
// }
hydrate("userStore", userStore).then(() => {
    console.log("token", userStore.token);
    hydrateSuccess();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// antd组件本地化
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { ConfigProvider } from "antd";

// 日期本地化设置
import moment from "moment";
import "moment/locale/zh-cn";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

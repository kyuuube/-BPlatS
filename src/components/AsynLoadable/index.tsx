import React, { PureComponent } from "react";
import Loadable, { LoadingComponentProps } from "react-loadable";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { Spin } from "antd";

const AsynLoadable = (loader: any) => {
  return Loadable({
    loader: loader!,
    timeout: 10000,
    loading: props => {
      return <Loading {...props} />;
    }
  });
};

class Loading extends PureComponent<LoadingComponentProps> {
  componentDidMount() {
    // 顶部进度条
    nprogress.inc(0.7);
    nprogress.start();
  }
  componentWillUnmount() {
    nprogress.done();
  }
  render() {
    const props = this.props;
    if (props.error) {
      console.warn("加载组件错误", props.error);
      return <div>Error!</div>;
    } else if (props.timedOut) {
      return <div>Taking a long time...</div>;
    } else if (props.pastDelay) {
      return <Spin />;
    } else {
      return null;
    }
  }
}

export default AsynLoadable;

// 该组件只适用于 ui render的组件
// 如果只是引入js文件 请用 import('./components/Bar').then(Bar => {})
// https://github.com/thejameskyle/react-loadable
/*

import AsynLoadable from 'components/AsynLoadable';
const EditorBox = AsynLoadable(()=>import('react-lz-editor'));
EditorBox.preload(); // 此函数可在外层容器中先加载进来

 */

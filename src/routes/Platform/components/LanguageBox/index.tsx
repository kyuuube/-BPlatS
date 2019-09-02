import React, { Component } from "react";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { Icon } from "antd";
import { hot } from "react-hot-loader";

interface Props {}
interface State {}
@hot(module)
@observer
export default class LanguageBox extends Component<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <span className="LanguageBox">
        <Icon type="global" />
      </span>
    );
  }
}

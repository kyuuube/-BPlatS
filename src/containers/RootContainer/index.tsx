import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style.less";
import { withRouter, RouteComponentProps } from "react-router";
// import userStore from "stores/userStore";

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
  param1: string;
};

interface Props extends Partial<RouteComponentProps<PathParamsType>> {}

interface State {}

@(withRouter as any)
export default class RootContainer extends Component<Props, State> {
  render() {
    return this.props.children;
  }
}

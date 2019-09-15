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
    // console.log(this.props.match.params.param1)
    const { location } = this.props;
    const pathname = this.props.location!.pathname;
    return this.props.children;
    // return (
    //   <TransitionGroup>
    //     <CSSTransition
    //       in={true}
    //       key={pathname}
    //       classNames="example"
    //       timeout={500}
    //       mountOnEnter={true}
    //       unmountOnExit={true}
    //       className="rootContainer"
    //     >
    //       {this.props.children}
    //       {/* {React.cloneElement((this.props.children || <div />) as any, {
    //         key: pathname
    //       })} */}
    //     </CSSTransition>
    //   </TransitionGroup>
    // );
  }
}

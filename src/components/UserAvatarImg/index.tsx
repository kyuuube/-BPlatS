import React, { Component } from "react";
import urlDefaultProductAvatar from "./assets/defaultProductAvatar.png";
import "./style.less";

export { urlDefaultProductAvatar };

interface Props {
  src: string;
  className?: string;
}
interface State {}
// 拥有默认头像 的
export default class UserAvatarImg extends Component<Props, State> {
  static defaultProps = {
    src: ""
  };
  render() {
    return <img {...this.props} src={this.props.src || urlDefaultProductAvatar} className={"UserAvatarImg " + this.props.className} />;
  }
}

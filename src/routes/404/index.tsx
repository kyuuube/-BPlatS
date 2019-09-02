import React, { Component } from "react";

interface Props {}
interface State {}
export default class Nothing extends Component<Props, State> {
  componentDidMount() {
    console.log("404");
  }
  render() {
    return <div>nothing 404</div>;
  }
}

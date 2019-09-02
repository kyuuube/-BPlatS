import React, { Component } from "react";
import "./style.less";
import { Modal, Spin } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { parse } from "query-string";

interface Props extends RouteComponentProps {}
interface State {
  query: any;
}

class MyComp extends Component<Props, State> {
  static defaultProps = {};
  readonly state: State = {
    query: {}
  };
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.setQuery(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log("nextProps", nextProps);
    this.setQuery(nextProps);
  }

  setQuery(props: Props) {
    const { search } = props.location;
    const query = parse(search);
    this.setState({
      query
    });
  }

  render() {
    return (
      <div>
        <div>MyComp</div>
        <div>{JSON.stringify(this.state.query)}</div>
      </div>
    );
  }
}

export default withRouter(MyComp);

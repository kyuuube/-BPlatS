import React, { Component } from "react";
import "./style.less";
import { observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router";
import { parse } from "query-string";
import history from "routes/history";
import MyComp from "./components/MyComp";

type QueryType = {
  name?: string;
};
type PathParamsType = {
  id: string;
};
interface Props extends RouteComponentProps<PathParamsType> {}
interface State {}

@observer
export default class Page1 extends Component<Props, State> {
  readonly state: State = {};
  componentDidMount() {
    // /page1/233?name=赵日天
    // hash: ""
    // pathname: "/page1/233"
    // search: "?name=%E8%B5%B5%E6%97%A5%E5%A4%A9"
    // state: undefined
    const { hash, pathname, search, state } = this.props.location;
    console.log("location", this.props.location);
    console.log("props", this.props);
    const query: QueryType = parse(search);
    console.log({ query, params: this.props.match.params });
  }
  render() {
    return (
      <div className="page Page1">
        page1
        <div onClick={() => history.push("/page1/123465?name=李杀神")}>跳转</div>
        <MyComp />
      </div>
    );
  }
}

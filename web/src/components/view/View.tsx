import "./View.scss";

import { RouteChildrenProps, Switch } from "react-router-dom";

import React from "react";

interface Props extends RouteChildrenProps {}
interface State {}

class View extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  public render() {
    return <Switch></Switch>;
  }
}
export default View;

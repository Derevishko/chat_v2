import "./View.scss";

import { Route, RouteChildrenProps, Switch } from "react-router-dom";

import HomeView from "./homeView/HomeView";
import React from "react";

interface Props extends RouteChildrenProps {}
interface State {}

class View extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <Switch>
        <Route component={HomeView} />
      </Switch>
    );
  }
}
export default View;

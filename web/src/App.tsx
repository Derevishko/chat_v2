import React from "react";
import { Route } from "react-router-dom";
import View from "./components/view/View";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <>
        <Route component={View} />
      </>
    );
  }
}

export default App;

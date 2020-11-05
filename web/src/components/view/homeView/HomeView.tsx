import "./HomeView.scss";

import ChatsListContainer from "../../../containers/chatsList/ChatsListContainer";
import React from "react";

interface Props {
  className?: string;
}
interface State {}

class HomeView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className
      ? `${this.props.className} home-view`
      : "home-view";
  }

  public render() {
    return (
      <div className={this.className}>
        <ChatsListContainer />
      </div>
    );
  }
}
export default HomeView;

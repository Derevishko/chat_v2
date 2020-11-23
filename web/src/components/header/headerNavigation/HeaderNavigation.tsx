import "./HeaderNavigation.scss";

import { NavLink } from "react-router-dom";
import React from "react";

interface Props {
  className?: string;
}
interface State {}

class HeaderNavigation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className
      ? `${this.props.className} header-navigation`
      : "header-navigation";
  }

  public render() {
    return (
      <nav className={this.className}>
        <NavLink to={"/chats"}>chats</NavLink>
      </nav>
    );
  }
}
export default HeaderNavigation;

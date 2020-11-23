import "./Header.scss";

import AuthContainer from "../../containers/auth/AuthContainer";
import HeaderNavigation from "./headerNavigation/HeaderNavigation";
import Logo from "../logo/Logo";
import React from "react";

interface Props {
  className?: string;
}
interface State {}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className ? `${this.props.className} header` : "header";
  }

  public render() {
    return (
      <div className={this.className}>
        <Logo />
        <HeaderNavigation />
        <AuthContainer />
      </div>
    );
  }
}
export default Header;

import "./Logo.scss";

import React from "react";

interface Props {
  className?: string;
}
interface State {}

class Logo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className ? `${this.props.className} logo` : "logo";
  }

  public render() {
    return <div className={this.className}>LOGO</div>;
  }
}
export default Logo;

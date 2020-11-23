import "./Auth.scss";

import React from "react";
import SigninForm from "./signinForm/SigninForm";

interface Props {
  className?: string;

  loading: boolean;

  onSignin: (login: string, password: string) => void;
  onSignup: (login: string, password: string) => void;
}
interface State {}

class Auth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public get className(): string {
    return this.props.className ? `${this.props.className} auth` : "auth";
  }

  public render() {
    return (
      <div className={this.className}>
        <SigninForm
          disabled={this.props.loading}
          onSubmit={this.props.onSignin}
        />
      </div>
    );
  }
}
export default Auth;

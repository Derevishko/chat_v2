import "./SigninForm.scss";

import React, { ChangeEvent, SyntheticEvent } from "react";

import { Input } from "antd";
import LoginValidator from "../../../../utils/validator/loginValidator/LoginValidator";
import PasswordValidator from "../../../../utils/validator/passwordValidator/PasswordValidator";

interface Props {
  className?: string;
  disabled: boolean;
  onSubmit: (login: string, password: string) => void;
}
interface State {
  login: string;
  password: string;
}

class SigninForm extends React.Component<Props, State> {
  private loginValidator: LoginValidator;
  private passwordValidator: PasswordValidator;
  constructor(props: Props) {
    super(props);
    this.loginValidator = new LoginValidator("");
    this.passwordValidator = new PasswordValidator("");
    this.state = { login: "", password: "" };
  }

  public get className(): string {
    return this.props.className
      ? `${this.props.className} signin-form`
      : "signin-form";
  }

  private get isValideLogin(): boolean {
    return this.loginValidator.check();
  }
  private get loginClassName(): string | undefined {
    if (this.isValideLogin) {
      return "correct";
    } else if (this.state.login) {
      return "uncorrect";
    } else {
      return;
    }
  }
  private get isValidePassword(): boolean {
    return this.passwordValidator.check();
  }

  private get passwordClassName(): string | undefined {
    if (this.isValidePassword) {
      return "correct";
    } else if (this.state.login) {
      return "uncorrect";
    } else {
      return;
    }
  }

  private handleChangeLogin(event: ChangeEvent<HTMLInputElement>) {
    const login: string = event.currentTarget.value;
    this.loginValidator.update(login);
    this.setState({
      login,
    });
  }
  private handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    const password: string = event.currentTarget.value;
    this.passwordValidator.update(password);
    this.setState({
      password,
    });
  }

  private handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    console.log("handleSubmit");
    if (this.props.disabled) return;
    this.props.onSubmit(this.state.login, this.state.password);
  }

  public render() {
    return (
      <form className={this.className} onSubmit={this.handleSubmit.bind(this)}>
        <Input
          placeholder="login"
          type="text"
          value={this.state.login}
          name={"login"}
          className={this.loginClassName}
          onChange={this.handleChangeLogin.bind(this)}
        />

        <Input
          placeholder="password"
          type="password"
          value={this.state.password}
          name={"password"}
          className={this.passwordClassName}
          onChange={this.handleChangePassword.bind(this)}
        />

        <Input type="submit" value="Signin" disabled={this.props.disabled} />
      </form>
    );
  }
}
export default SigninForm;

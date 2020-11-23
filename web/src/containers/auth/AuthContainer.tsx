import Auth from "../../components/user/auth/Auth";
import AuthService from "../../services/AuthService";
import React from "react";
import { saveTokens } from "../../store/actions/userActions";
import sha256 from "sha256";
import store from "../../store/store";

interface Props {}
interface State {
  loading: boolean;
}

class AuthContainer extends React.Component<Props, State> {
  private authService: AuthService;
  constructor(props: Props) {
    super(props);
    this.authService = new AuthService();
    this.state = { loading: false };
  }

  private get loading(): boolean {
    return this.state.loading;
  }

  private set loading(loading: boolean) {
    this.setState({ loading });
  }

  private async signin(login: string, password: string) {
    console.log("signin");
    if (this.loading) {
      return;
    }
    this.loading = true;
    const salt = "" + +new Date();
    password = sha256(sha256(password) + salt);
    this.authService
      .signin({ login, password, salt })
      .then((response) => {
        store.dispatch(saveTokens(response.tokens));
        console.log(response.tokens);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private signup(login: string, password: string) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    password = sha256(password);
    this.authService
      .signup({ login, password })
      .then((response) => {
        console.log(response.tokens);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  public render() {
    const { loading } = this.state;

    return (
      <Auth
        loading={loading}
        onSignin={this.signin.bind(this)}
        onSignup={this.signup.bind(this)}
      />
    );
  }
}
export default AuthContainer;

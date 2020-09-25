declare namespace AuthControllerNamespace {
  interface ISigninData {
    login: string;
    password: string;
    salt: string;
  }
  type TSigninResponse = App.TControllerResponse<{
    tokens: ITokens;
  }>;

  interface ISignupData {
    login: string;
    password: string;
  }
  type TSignupResponse = App.TControllerResponse;

  interface IRefreshData {
    refresh: string;
  }
  type TRefreshResponse = App.TControllerResponse<{
    tokens: ITokens;
  }>;

  interface ILogoutData {
    refresh: string;
  }
  type TLogoutResponse = App.TControllerResponse;

  interface ITokens {
    access: string;
    refresh: string;
  }
}

declare namespace App {
  type TControllerResponse<T = void> = Promise<{
    status: number;
    data: IControllerResponseData<T>;
    headers?: any;
  }>;
  type IControllerResponseData<T = void> = T | { error: string };
  interface IUser {
    _id: string;
    login: string;
    password: string;
    online?: boolean;
    active?: boolean;
    registrationDate?: Date;
  }
  interface IConfig {
    sectetKey: string;
    expiresInAccessToken: string;
    expiresInRefreshToken: string;
  }
}

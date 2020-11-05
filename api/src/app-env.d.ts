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
    port: number;
  }
  interface IMessage {
    chatId: string;
    user: IUser;
    text: string;
    created: Date;
  }
  interface IChat {
    name: string;
  }
  interface IUserChat {
    user: IUser;
    chat: IChat;
    lastSawMessage: IMessage;
  }
}

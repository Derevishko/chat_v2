/// <reference types="react-scripts" />

namespace App {
  interface IMessage {
    _id: string;
    created: string;
    text: string;
    user: IUser;
  }
  interface IUser {
    _id: string;
    login: string;
  }
  interface IChat {
    _id: string;
    name: string;
  }
  interface IPaginationParams {
    skip: number;
    limit: number;
  }

  interface ITokens {
    access: string;
    refresh: string;
  }
}

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
}

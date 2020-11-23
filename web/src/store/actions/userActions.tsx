interface SaveUser {
  type: "saveUser";
  user?: App.IUser;
}
interface SaveTokens {
  type: "saveTokens";
  tokens?: App.ITokens;
}
interface Logout {
  type: "logout";
}

export type Actions = SaveUser | SaveTokens | Logout;

export function saveUser(user?: App.IUser): SaveUser {
  return {
    type: "saveUser",
    user,
  };
}
export function saveTokens(tokens: App.ITokens): SaveTokens {
  return {
    type: "saveTokens",
    tokens,
  };
}
export function logout(): Logout {
  return {
    type: "logout",
  };
}

import { Actions } from "../actions/userActions";

export interface UserStore {
  user?: App.IUser;
  tokens?: App.ITokens;
  loadingUser: boolean;
}
export const defaultUserStore: UserStore = {
  tokens: getTokensFromLocalStorage(),
  loadingUser: false,
};
export function user(store: UserStore, action: Actions): UserStore {
  switch (action.type) {
    case "saveTokens": {
      saveTokensInLocalStorage(action.tokens);
      store.tokens = action.tokens;
      break;
    }

    case "saveUser": {
      store.user = action.user;
      break;
    }

    case "logout": {
      saveTokensInLocalStorage();
      store.user = undefined;
      store.tokens = undefined;
      break;
    }

    default:
      break;
  }
  return store;
}

function saveTokensInLocalStorage(tokens?: App.ITokens): void {
  if (tokens) {
    localStorage.chat_tokens = JSON.stringify(tokens);
  } else {
    localStorage.removeItem("chat_tokens");
  }
}

function getTokensFromLocalStorage(): App.ITokens | undefined {
  try {
    return JSON.parse(localStorage.chat_tokens);
  } catch {
    return;
  }
}

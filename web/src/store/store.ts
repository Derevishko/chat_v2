import { UserStore, defaultUserStore, user } from "./reducers/userReducer";

import { Actions as UserActions } from "./actions/userActions";
import { createStore } from "redux";

type Actions = UserActions;

interface Store {
  user: UserStore;
}

const defaultStore: Store = {
  user: defaultUserStore,
};

function store(store: Store = defaultStore, action: Actions) {
  return {
    user: user(store.user, action),
  };
}

export default createStore(store);

import { combineReducers } from "redux";

const reducers = ["user", "dialogs", "messages", "app", "attachments"];

let rootReducer = combineReducers(
  reducers.reduce((initial: any, name: string) => {
    initial[name] = require(`./${name}`).default;
    return initial;
  }, {})
);

type RootReducer = typeof rootReducer;
export type AppStateType = ReturnType<RootReducer>;

export default rootReducer;

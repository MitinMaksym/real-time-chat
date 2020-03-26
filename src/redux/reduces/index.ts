import { combineReducers } from "redux";

import appReducer from "./app";
import dialogsReducer from "./dialogs";
import messagesReducer from "./messages";
import userReducer from "./user";
import attachmentsReducer from "./attachments";

// const reducers = ["user", "dialogs", "messages", "app", "attachments"];

// let rootReducer = combineReducers(
//   reducers.reduce((initial: any, name: string) => {
//     initial[name] = require(`./${name}`).default;
//     return initial;
//   }, {})
// );

let rootReducer = combineReducers({
  user: userReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
  app: appReducer,
  attachments: attachmentsReducer
});

type RootReducer = typeof rootReducer;
export type AppStateType = ReturnType<RootReducer>;

export default rootReducer;

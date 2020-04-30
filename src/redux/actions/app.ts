import { GetStateType } from "./../../types/types";
import { AppStateType } from "./../reduces/index";
import { ThunkAction } from "redux-thunk";
import { fetchUserData } from "./user";
import { InferActionsTypes } from "../store";

export type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  initializeAppAC: () => ({ type: "APP:INITIALIZE_APP" } as const),
};

//------------------------THUNK CREATORS
export const initializeApp = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsTypes
> => (dispatch, getState) => {
  let isAuth = getState().user.isAuth;
  if (isAuth) {
    let promise = dispatch(fetchUserData());
    Promise.all([promise]).then((data) => {
      dispatch(actions.initializeAppAC());
    });
  } else {
    dispatch(actions.initializeAppAC());
  }
};
export default actions;

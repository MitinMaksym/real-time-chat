import { GetStateType } from "./../../types/types";
import { AppStateType } from "./../reduces/index";
import { userActions } from ".";
import { INITIALIZED_SUCCESS } from "../reduces/app";
import { ThunkAction } from "redux-thunk";

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export type ActionsTypes = InitializedSuccessActionType;

//type DispatchType = Dispatch<InitializedSuccessType>
const actions = {
  initializeApp: (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => (
    dispatch,
    getState: GetStateType
  ): void => {
    let isAuth = getState().user.isAuth;
    if (isAuth) {
      let promise = dispatch(userActions.fetchUserData());
      Promise.all([promise]).then(data => {
        dispatch({ type: INITIALIZED_SUCCESS });
      });
    } else {
      dispatch({ type: INITIALIZED_SUCCESS });
    }
  }
};

export default actions;

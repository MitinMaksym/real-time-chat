import { ActionsTypes } from "./../actions/user";
import { UserDataType } from "./../../types/types";
export const SET_USER_DATA = "USER:SET_USER_DATA";
export const SET_IS_AUTH = "USER:SET_IS_AUTH";

const initialState = {
  data: null as UserDataType | null,
  isAuth: window.localStorage.token ? true : false,
};

export type InitialStateType = typeof initialState;

export default (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "USERS:SET_USER_DATA":
      return {
        ...state,

        data: action.payload,
      };
    case "USERS:SET_IS_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };

    default:
      return state;
  }
};

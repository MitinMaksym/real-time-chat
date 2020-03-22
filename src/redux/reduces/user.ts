import { UserDataType } from "./../../types/types";
export const SET_USER_DATA = "USER:SET_USER_DATA";
export const SET_IS_AUTH = "USER:SET_IS_AUTH";
type DataType = {
  user: UserDataType;
  status: string;
};
export type InitialStateType = {
  data: null | DataType;
  isAuth: boolean;
};
const initialState: InitialStateType = {
  data: null,
  isAuth: window.localStorage.token ? true : false
};

export default (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        data: action.payload
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };

    default:
      return state;
  }
};

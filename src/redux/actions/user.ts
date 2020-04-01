import { SetMessagesActionType } from "./messages";
import { AppStateType } from "./../reduces/index";
import { ThunkAction } from "redux-thunk";
import { UserDataType } from "./../../types/types";
import { userApi } from "../../utils/api";
import { openNotification } from "../../utils/helpers";
import { dialogsActions, messagesActions } from "./index";
import { SET_USER_DATA, SET_IS_AUTH } from "../reduces/user";
import axios from "axios";
import { SetItemsActionType, SetCurrentDialogActionType } from "./dialogs";

type SetAuthActionType = {
  type: typeof SET_IS_AUTH;
  payload: boolean;
};

type SetUserActionType = {
  type: typeof SET_USER_DATA;
  payload: UserDataType | null;
};

type SignUpPostDataType = {
  fullname: string;
  email: string;
  password: string;
};

export type ActionsTypes =
  | SetAuthActionType
  | SetUserActionType
  | SetItemsActionType
  | SetMessagesActionType
  | SetCurrentDialogActionType;

export type UsersThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;
const actions = {
  setAuth: (payload: boolean): SetAuthActionType => ({
    type: SET_IS_AUTH,
    payload
  }),
  setUserData: (data: UserDataType | null): SetUserActionType => {
    return {
      type: SET_USER_DATA,
      payload: data
    };
  },
  fetchUserData: (): ThunkAction<
    Promise<any>,
    AppStateType,
    unknown,
    ActionsTypes
  > => async dispatch => {
    try {
      const data = await userApi.getUserInfo();
      if (data.status === "success") {
        dispatch(actions.setUserData(data.user));
        return data;
      }
    } catch (err) {
      if (err.response.status === 403) {
        delete window.localStorage.token;
        axios.defaults.headers.common["token"] = "";
      } else {
        throw new Error(err);
      }
    }
  },
  signOut: (): UsersThunkType => async dispatch => {
    dispatch(actions.setAuth(false));
    dispatch(actions.setUserData(null));
    dispatch(dialogsActions.setItems([]));
    dispatch(messagesActions.setMessages([]));
    delete window.localStorage.token;
    dispatch(dialogsActions.setCurrentDialog(""));
  },
  fetchLoginData: (postData: {
    email: string;
    password: string;
    //@ts-ignore
  }): UsersThunkType => async dispatch => {
    try {
      const data = await userApi.signUserIn(postData);
      if (data.status === "success") {
        const { token } = data;

        window.localStorage["token"] = token;
        axios.defaults.headers.common["token"] = token;

        openNotification({
          type: "success",
          message: "Авторизация пройшла успешно!",
          description: "",
          duration: 1
        });
        return data;
      }
    } catch (err) {
      if (err.response.status === 404) {
        openNotification({
          type: "error",
          message: "Ошибка при авторизации",
          description: "Такой пользователь не зарегистрирован",
          duration: 1
        });
      } else if (err.response.status === 401) {
        openNotification({
          type: "error",
          message: "Ошибка при авторизации",
          description: "Ваш аккаунт не подтвержден",
          duration: 1
        });
      } else {
        delete window.localStorage.token;
        axios.defaults.headers.common["token"] = "";
        openNotification({
          type: "error",
          message: "Ошибка при авторизации",
          description: "Неправильный логин или пароль",
          duration: 1
        });
      }
    }
  }
};

export default actions;

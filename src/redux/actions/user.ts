import { UserDataType } from "./../../types/types";
import { userApi } from "../../utils/api";
import { openNotification } from "../../utils/helpers";
import { dialogsActions, messagesActions } from "./index";
import { SET_USER_DATA, SET_IS_AUTH } from "../reduces/user";
import axios from "axios";

type SetAuthActionType = {
  type: typeof SET_IS_AUTH;
  payload: boolean;
};

type SetUserActionType = {
  type: typeof SET_USER_DATA;
  payload: UserDataType | null;
};

type fetchLoginPostDataType = {
  email: string;
  password: string;
};

type SignUpPostDataType = {
  fullname: string;
  email: string;
  password: string;
};

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
  fetchUserData: () => async (dispatch: any) => {
    try {
      const data = await userApi.getUserInfo();
      if (data.data.status === "success") {
        dispatch(actions.setUserData(data.data));
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
  signOut: () => async (dispatch: any) => {
    dispatch(actions.setAuth(false));
    dispatch(actions.setUserData(null));
    dispatch(dialogsActions.setItems([]));
    dispatch(messagesActions.setMessages([]));
    delete window.localStorage.token;
    dispatch(dialogsActions.setCurrentDialog(null));
  },
  fetchLoginData: (postData: fetchLoginPostDataType) => async (
    dispatch: any
  ) => {
    try {
      const data = await userApi.signUserIn(postData);
      if (data.data.status === "success") {
        const { token } = data.data;

        window.localStorage["token"] = token;
        axios.defaults.headers.common["token"] = token;

        openNotification({
          type: "success",
          message: "Авторизация пройшла успешно!",
          description: "",
          duration: 1
        });
        return data.data;
      }
    } catch (err) {
      console.log(err);
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
  },
  signUserUp: (postData: SignUpPostDataType) => async (dispatch: any) => {
    console.log(postData);

    try {
      let data = await userApi.signUserUp(postData);
      return data;
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        openNotification({
          type: "error",
          message: "Ошибка при регистрации",
          description: "Такой пользователь уже зарегистрирован",
          duration: 1
        });
      } else {
        openNotification({
          type: "error",
          message: "Server Error",
          description: "Something went wrong",
          duration: 1
        });
      }
    }
  }
};

export default actions;

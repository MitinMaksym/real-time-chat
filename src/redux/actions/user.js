import { userApi } from "../../utils/api";
import { openNotification } from "../../utils/helpers";
import { dialogsActions, messagesActions } from "./index";
import { SET_USER_DATA, SET_IS_AUTH } from "../reduces/user";

const actions = {
  setAuth: payload => ({ type: SET_IS_AUTH, payload }),
  setUserData: data => {
    return {
      type: SET_USER_DATA,
      payload: data
    };
  },
  fetchUserData: () => async dispatch => {
    try {
      const data = await userApi.getUserInfo();
      if (data.data.status === "success") {
        dispatch(actions.setUserData(data.data));
        return data;
      }
    } catch (err) {
      if (err.response.status === 403) {
        delete window.localStorage.token;
        window.axios.defaults.headers.common["token"] = "";
      } else {
        throw new Error(err);
      }
    }
  },
  signOut: () => async dispatch => {
    dispatch(actions.setAuth(false));
    dispatch(actions.setUserData(null));
    dispatch(dialogsActions.setItems([]));
    dispatch(messagesActions.setMessages([]));
    delete window.localStorage.token;
    dispatch(dialogsActions.setCurrentDialog(null));
  },

  fetchLoginData: postData => async dispatch => {
    try {
      const data = await userApi.signUserIn(postData);
      if (data.data.status === "success") {
        const { token } = data.data;

        window.localStorage["token"] = token;
        window.axios.defaults.headers.common["token"] = token;

        openNotification({
          type: "success",
          message: "Авторизация пройшла успешно!",
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
          description: "Такой пользователь не зарегистрирован"
        });
      } else if (err.response.status === 401) {
        openNotification({
          type: "error",
          message: "Ошибка при авторизации",
          description: "Ваш аккаунт не подтвержден"
        });
      } else {
        delete window.localStorage.token;
        window.axios.defaults.headers.common["token"] = "";
        openNotification({
          type: "error",
          message: "Ошибка при авторизации",
          description: "Неправильный логин или пароль"
        });
      }
    }
  },
  signUserUp: postData => async dispatch => {
    try {
      let data = await userApi.signUserUp(postData);
      return data;
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        openNotification({
          type: "error",
          message: "Ошибка при регистрации",
          description: "Такой пользователь уже зарегистрирован"
        });
      } else {
        openNotification({
          type: "error",
          message: "Server Error",
          description: "Something went wrong"
        });
      }
    }
  }
};

export default actions;

export const SET_USER_DATA = "USER:SET_USER_DATA";
export const SET_IS_AUTH = "USER:SET_IS_AUTH";

const initialState = {
  data: null,
  isAuth: window.localStorage.token ? true : false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        data: payload
      };
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: payload
      };

    default:
      return state;
  }
};

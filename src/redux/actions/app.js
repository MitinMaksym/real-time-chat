import { userActions } from "../actions";
import { INITIALIZED_SUCCESS } from "../reduces/app";

const actions = {
  initializeApp: () => (dispatch, getState) => {
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

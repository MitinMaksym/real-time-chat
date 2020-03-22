import { userActions } from ".";
import { INITIALIZED_SUCCESS } from "../reduces/app";

const actions = {
  initializeApp: () => (dispatch: any, getState: any): void => {
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

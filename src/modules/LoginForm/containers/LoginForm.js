import LoginForm from "../components/LoginForm";
import { withFormik } from "formik";
import validateFunc from "./../../../utils/validations";
import store from "../../../redux/store";
import { userActions } from "../../../redux/actions";
import { connect } from "react-redux";

const LoginFormContainer = withFormik({
  // Custom sync validation

  mapPropsToValues: () => ({ email: "", password: "" }),
  validate: values => {
    let errors = {};
    validateFunc({ isAuth: true, errors, values });
    return errors;
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    try {
      let data = await store.dispatch(userActions.fetchLoginData(values));
      console.log(data);
      setSubmitting(false);
      if (data.status === "success") {
        const data = await store.dispatch(userActions.fetchUserData());
        if (data.status === "success") {
          await store.dispatch({ type: "USER:SET_IS_AUTH", payload: true });
          await store.dispatch({ type: "INITIALIZED_SUCCESS" });
          props.history.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  displayName: "LoginForm"
})(LoginForm);

export default connect(({ user }) => {
  return {
    isAuth: user.isAuth
  };
})(LoginFormContainer);

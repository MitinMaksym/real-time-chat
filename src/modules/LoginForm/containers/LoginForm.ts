import { AppStateType } from "./../../../redux/reduces/index";
import LoginForm from "../components/LoginForm";
import { withFormik, FormikErrors } from "formik";
import validateFunc from "../../../utils/validations";
import store from "../../../redux/store";
import { userActions } from "../../../redux/actions";
import { connect } from "react-redux";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface FormProps {
  isAuth: boolean;
}

type MapStatePropsType = {
  isAuth: boolean;
};
const LoginFormContainer = withFormik<FormProps, LoginFormValues>({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validate: values => {
    let errors: FormikErrors<LoginFormValues> = {};
    validateFunc({ isAuth: true, errors, values });
    return errors;
  },

  handleSubmit: async (values, props) => {
    try {
      let data = await store.dispatch(userActions.fetchLoginData(values));
      console.log(values);
      props.setSubmitting(false);
      if (data.status === "success") {
        const data = await store.dispatch(userActions.fetchUserData());
        if (data.status === "success") {
          await store.dispatch({ type: "USER:SET_IS_AUTH", payload: true });
          await store.dispatch({ type: "INITIALIZED_SUCCESS" });
          //@ts-ignore
          props.history.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  displayName: "LoginForm"
})(LoginForm);

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.user.isAuth
  };
};

export default connect<MapStatePropsType, {}, {}, AppStateType>(
  mapStateToProps
)(LoginFormContainer);

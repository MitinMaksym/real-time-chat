import { fetchLoginData } from "./../../../redux/actions/user";
import { fetchUserData } from "../../../redux/actions/user";
import { AppStateType } from "./../../../redux/reduces/index";
import LoginForm from "../components/LoginForm";
import { withFormik, FormikErrors } from "formik";
import validateFunc from "../../../utils/validations";
import store from "../../../redux/store";
import { connect } from "react-redux";
import { appActions } from "../../../redux/actions";

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
  validate: (values) => {
    let errors: FormikErrors<LoginFormValues> = {};
    validateFunc({ isAuth: true, errors, values });
    return errors;
  },

  handleSubmit: async (values, props) => {
    try {
      let data = await fetchLoginData(values);
      props.setSubmitting(false);
      if (data && data.status === "success") {
        ///@ts-ignore
        store.dispatch(fetchUserData());

        store.dispatch(appActions.initializeAppAC());
      }
    } catch (err) {
      console.log(err);
    }
  },
  displayName: "LoginForm",
})(LoginForm);

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.user.isAuth,
  };
};

export default connect<MapStatePropsType, {}, {}, AppStateType>(
  mapStateToProps
)(LoginFormContainer);

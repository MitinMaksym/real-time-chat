import RegisterForm from "../components/RegisterForm";
import { withFormik } from "formik";
import validateFunc from "./../../../utils/validations";
import store from "../../../redux/store";
import actions from "../../../redux/actions/user";

export default withFormik({
  // Custom sync validation
  mapPropsToValues: () => ({
    email: "",
    password: "",
    password_2: "",
    fullname: ""
  }),
  validate: values => {
    let errors = {};
    validateFunc({ isAuth: false, errors, values });
    return errors;
  },

  handleSubmit: async (values, { setSubmitting, props }) => {
    const { email, password, fullname } = values;
    try {
      let data = await store.dispatch(
        actions.signUserUp({ fullname, password, email })
      );
      if (data.data.status === "success") {
        props.history.push("/user/verify");
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  },
  displayName: "RegisterForm"
})(RegisterForm);

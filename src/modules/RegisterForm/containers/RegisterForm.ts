import { withFormik } from "formik";
import RegisterForm from "../components/RegisterForm";
import validateFunc from "../../../utils/validations";
import { userApi } from "../../../utils/api";
import { openNotification } from "../../../utils/helpers";

export interface RegisterFormValues {
  email: string;
  password: string;
  fullname?: string;
  password_2?: string;
}

interface FormProps {}

export default withFormik<FormProps, RegisterFormValues>({
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
      if (fullname) {
        let data = await userApi.signUserUp({ email, password, fullname });
        if (data.status !== "error") {
          //@ts-ignore
          props.history.push("/user/verify");
        }
      }
    } catch (err) {
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
      setSubmitting(false);
    }
  },
  displayName: "RegisterForm"
})(RegisterForm);

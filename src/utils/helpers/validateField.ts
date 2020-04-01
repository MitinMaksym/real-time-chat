import { FormikErrors, FormikTouched } from "formik";
import { LoginFormValues } from "../../modules/LoginForm/containers/LoginForm";
import { RegisterFormValues } from "../../modules/RegisterForm/containers/RegisterForm";
type ValidateFieldTouchedType = FormikTouched<LoginFormValues> &
  FormikTouched<RegisterFormValues>;

type ValidateFieldErrorsType = FormikErrors<LoginFormValues> &
  FormikErrors<RegisterFormValues>;

let ValidateField = (
  key: "password" | "password_2" | "email" | "fullname",
  touched: ValidateFieldTouchedType,
  errors: ValidateFieldErrorsType
) => {
  if (touched[key]) {
    if (errors[key]) {
      return "error";
    } else {
      return "success";
    }
  } else {
    return "";
  }
};

export default ValidateField;

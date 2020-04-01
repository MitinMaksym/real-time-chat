import { RegisterFormValues } from "./../modules/RegisterForm/containers/RegisterForm";
import { LoginFormValues } from "../modules/LoginForm/containers/LoginForm";
import { FormikErrors } from "formik";

type ValidateFuncParamsTypes = {
  isAuth: boolean;
  errors: FormikErrors<LoginFormValues & RegisterFormValues>;
  values: LoginFormValues & RegisterFormValues;
};

type ValidateFuncType = (params: ValidateFuncParamsTypes) => void;

let validateFunc: ValidateFuncType = ({ isAuth, errors, values }) => {
  const rules = {
    email: (value: string) => {
      if (!value) {
        errors.email = "Введите почту";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Неправильный адресс почты";
      }
    },
    password: (value: string) => {
      if (!value) {
        errors.password = "Введите пароль";
      } else if (value.length < 6) {
        !isAuth && (errors.password = "Слишком лёгкий пароль");
      }
    },
    password_2: (value: string) => {
      if (value !== values.password) {
        errors.password_2 = "Пароли не совпадают";
      }
    },
    fullname: (value: string) => {
      if (!value) {
        errors.fullname = "Введите ваше имя";
      } else if (value.length < 4) {
        errors.fullname = "Имя должно содержать не меньше 4 символов";
      }
    }
  };

  Object.keys(values).forEach(
    //@ts-ignore
    (key: string) => rules[key] && rules[key](values[key])
  );
};

export default validateFunc;

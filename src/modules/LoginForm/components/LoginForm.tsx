import React from "react";

import { Form } from "antd";
import { Link } from "react-router-dom";
import { Button, Block, FormField } from "../../../components";
import { LoginFormValues } from "../containers/LoginForm";

import { Redirect } from "react-router-dom";
import { FormikProps } from "formik";

interface OtherProps {
  isAuth: boolean;
}
const LoginForm = (props: OtherProps & FormikProps<LoginFormValues>) => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isAuth
  } = props;
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      {" "}
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Block>
        <Form onSubmit={handleSubmit} className="login-form">
          <FormField
            errors={errors}
            touched={touched}
            placeholder="E-mail"
            handleChange={handleChange}
            handleBlur={handleBlur}
            type="email"
            icon="mail"
            id="email"
          />
          <FormField
            errors={errors}
            touched={touched}
            placeholder="Пароль"
            handleChange={handleChange}
            handleBlur={handleBlur}
            type="password"
            icon="lock"
            id="password"
          />

          <Form.Item>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Войти в аккаунт
            </Button>
          </Form.Item>
          <Link className="auth__register-link" to="/signup">
            Зарегистрироваться
          </Link>
        </Form>
      </Block>
    </div>
  );
};

export default LoginForm;

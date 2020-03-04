import React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";

import { Button, Block, FormField } from "../../../components";

const success = false;
const RegisterForm = props => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <div>
      {" "}
      <div className="auth__top">
        <h2>Регистрация</h2>
        <p>Для входа в чат вам нужно зарегистрироваться</p>
      </div>
      <Block>
        {!success ? (
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
              placeholder="Ваше имя"
              handleChange={handleChange}
              handleBlur={handleBlur}
              type="text"
              icon="user"
              id="fullname"
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
            <FormField
              errors={errors}
              touched={touched}
              placeholder="Повторите пароль"
              handleChange={handleChange}
              handleBlur={handleBlur}
              type="password"
              icon="lock"
              id="password_2"
            />

            <Form.Item>
              <Button
                disabled={isSubmitting}
                type="primary"
                size="large"
                onClick={handleSubmit}
              >
                Зарегистрироваться
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signin">
              Войти в аккаунт
            </Link>
          </Form>
        ) : (
          <div className="auth__success-block">
            <div>
              <Icon type="info-circle" theme="twoTone" />
            </div>
            <h2>Подтвердите свой аккаунт</h2>
            <p>
              На вашу почту отправлено письмо с ссылкой на подтверждения
              аккаунта.
            </p>
          </div>
        )}
      </Block>
    </div>
  );
};

export default RegisterForm;

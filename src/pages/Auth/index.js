import React from "react";
import { Route, Switch } from "react-router-dom";

import { LoginForm, RegisterForm } from "../../modules/index";
import CheckEmailInfo from "./components/CheckEmailInfo";

import "./Auth.scss";

const Auth = () => {
  return (
    <section className="auth">
      <div className="auth__content">
        <Switch>
          <Route exact path="/signup" component={RegisterForm} />
          <Route exact path="/user/verify" component={CheckEmailInfo} />
          <Route path={["/", "/signin"]} component={LoginForm} />
        </Switch>
      </div>
    </section>
  );
};

export default Auth;

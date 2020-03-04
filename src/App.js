import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, Result } from "antd";

import { appActions } from "./redux/actions";
import { Auth, Home } from "./pages";
function App(props) {
  let { isAuth, initializeApp, isInitialized } = props;
  useEffect(() => {
    initializeApp();
  }, [isAuth, initializeApp]);

  if (!isInitialized) {
    return (
      <Spin
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
        size="large"
        tip="Загрузка..."
      />
    );
  }
  return (
    <div className="wrapper">
      {" "}
      <Switch>
        {isAuth && (
          <Route exact path="/:dialog?/:id?" render={() => <Home />} />
        )}
        <Route
          exact
          path={["/", "/signin", "/signup", "/user/verify"]}
          component={Auth}
        />
        <Route
          render={() => {
            return (
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}
export default connect(
  ({ user, app }) => ({
    isAuth: user.isAuth,
    isInitialized: app.isInitialized
  }),
  appActions
)(App);

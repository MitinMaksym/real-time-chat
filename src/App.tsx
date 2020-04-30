import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, Result } from "antd";

import { Auth, Home } from "./pages";
import { AppStateType } from "./redux/reduces";
import { initializeApp } from "./redux/actions/app";

type MapStatePropsType = {
  isInitialized: boolean;
  isAuth: boolean;
};

type MapDisptchPropsType = {
  initializeApp: () => void;
};

type OwnPropsType = {};

type Props = MapStatePropsType & MapDisptchPropsType & OwnPropsType;
let App: React.FC<Props> = (props) => {
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
          transform: "translate(-50%, -50%)",
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
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.user.isAuth,
    isInitialized: state.app.isInitialized,
  };
};
export default connect<
  MapStatePropsType,
  MapDisptchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, { initializeApp })(App);

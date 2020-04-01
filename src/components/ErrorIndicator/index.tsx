import React from "react";
import { Result } from "antd";
import { withRouter } from "react-router-dom";

let ErrorIndicator: React.FC = () => {
  return <Result status="500" subTitle="Что-то пошло не так." />;
};

export default withRouter(ErrorIndicator);

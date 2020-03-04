import React from "react";
import classNames from "classnames";

import "./Status.scss";

export default function Status({ online, fullname }) {
  return (
    <div className="chat__dialog-header-center">
      <b className="chat__dialog-header-username">{fullname}</b>
      <div className="chat__dialog-header-status"></div>
      <div className={classNames("status", { "status--online": online })}>
        {online ? "онлайн" : "офлайн"}
      </div>
    </div>
  );
}

import React from "react";
import PropTypes from "prop-types";

import readedSvg from "../../assets/img/readed.svg";
import noReadedSvg from "../../assets/img/noreaded.svg";

import "./IconReaded.scss";

export default function IconReaded({ isMe, isReaded }) {
  return (
    <div>
      {isMe &&
        (isReaded ? (
          <img
            className="message__icon-readed"
            src={readedSvg}
            alt="Readed icon"
          />
        ) : (
          <img
            className="message__icon-readed message__icon-readed--no"
            src={noReadedSvg}
            alt="No readed icon"
          />
        ))}
    </div>
  );
}

IconReaded.propTypes = {
  isReaded: PropTypes.bool,
  isMe: PropTypes.bool
};

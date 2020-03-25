import React from "react";
import { Button as BaseButton } from "antd";
import classnames from "classnames";

import "./Button.scss";
type Props = {
  className: string;
  size: "small" | "large";
};
const Button: React.FC<Props> = props => {
  return (
    <BaseButton
      {...props}
      className={classnames("button", props.className, {
        "button--large": props.size === "large"
      })}
    />
  );
};

export default Button;

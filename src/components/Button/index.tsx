import React, { ButtonHTMLAttributes, FormEvent, MouseEvent } from "react";
import { Button as BaseButton } from "antd";
import classnames from "classnames";

import "./Button.scss";
import { ButtonProps } from "antd/lib/button";
type OwnProps = {};
const Button: React.FC<OwnProps & ButtonProps> = props => {
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

import React, { ReactNode } from "react";
import classnames from "classnames";

import "./Block.scss";

type Props = {
  className?: string;
  children: ReactNode;
};
const Block: React.FC<Props> = ({ children, className }) => {
  return <div className={classnames("block", className)}>{children}</div>;
};

export default Block;

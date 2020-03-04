import React from 'react';
import propTypes from 'prop-types';
import {Button as BaseButton} from 'antd';
import classnames from 'classnames';

import './Button.scss';

const Button = props => {
  return (
    <BaseButton {...props} className={classnames("button", props.className, {'button--large': props.size === 'large'})} />
  );
};

Button.propTypes = {
  className: propTypes.string
};

export default Button;
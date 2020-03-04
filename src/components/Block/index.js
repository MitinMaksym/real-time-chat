import React from 'react';
import classnames from 'classnames';


import './Block.scss';

export default function Block({children, className}) {
return <div className = {classnames('block',className)}>{children}</div>
}

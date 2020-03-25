import React, { memo } from "react";
import { Form, Icon, Input } from "antd";

import { validateField } from "../../utils/helpers";

type FormErrors = {
  email?: string;
  password?: string;
  password_2?: string;
  fullname?: string;
};

type TouchedType = {
  email?: boolean;
  password?: boolean;
  password_2?: boolean;
  fullname?: boolean;
};
type Props = {
  errors: FormErrors;
  type: string;
  icon: string;
  placeholder: string;
  id: string;
  touched: TouchedType;
  handleChange: () => void;
  handleBlur: () => void;
};

const FormField: React.FC<Props> = ({
  errors,
  type,
  icon,
  placeholder,
  handleChange,
  handleBlur,
  id,
  touched
}) => {
  return (
    <Form.Item
      //@ts-ignore
      help={touched[id] && errors[id]}
      validateStatus={validateField(id, touched, errors)}
      hasFeedback
    >
      {" "}
      <Input
        prefix={<Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Form.Item>
  );
};

export default FormField;

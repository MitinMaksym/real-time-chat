import React from "react";
import { Form, Icon, Input } from "antd";

import { validateField } from "../../utils/helpers";

export default function FormField({
  errors,
  type,
  icon,
  placeholder,
  handleChange,
  handleBlur,
  id,
  touched
}) {
  return (
    <Form.Item
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
}

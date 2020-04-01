import React, { ChangeEvent, FocusEvent } from "react";
import { Form, Icon, Input } from "antd";

import { validateField } from "../../utils/helpers";
import { FormikTouched, FormikErrors } from "formik";
import { LoginFormValues } from "../../modules/LoginForm/containers/LoginForm";

type Props = {
  errors: FormikErrors<LoginFormValues>;
  type: "password" | "email" | "text";
  icon: string;
  placeholder: string;
  id: "password" | "password_2" | "email" | "fullname";
  touched: FormikTouched<LoginFormValues>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
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

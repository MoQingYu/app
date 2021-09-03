import React from "react";
import { Form, FormItemProps } from "antd";

type PropsModal = FormItemProps & {
  showLabel?: boolean
}

export default (props: PropsModal) => {
  const { 
    label, 
    required = false,
    children,
    showLabel = true,
    ...rest 
  } = props;
  return (
    <Form.Item
      label={showLabel ? label : null}
      rules={[
        {required, message: `${label}不能为空`}
      ]}
      {...rest}
    >
      {children}
    </Form.Item>
  )
}
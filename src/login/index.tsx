import React from "react";
import { Form, Input } from "antd";
import "./style.less";

const Login: React.FC<any> = () => {
  return (
    <div>
      <Form>
        <Form.Item 
          name="username" 
          label="用户名" 
          rules={[{required: true}]}
        >
          <Input autoComplete="off" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item 
          name="password" 
          label="密码" 
          rules={[{required: true}]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label="验证码">
          <Form.Item name="code">
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <img src="" />
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
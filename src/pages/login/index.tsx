import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signin } from "@api/user";
import cache from "@utils/cache";
import { SHOP_TOKEN } from "@config/constants";
import {
  LonginRequest
} from "@models/user";
import { L_FormItem } from "@components/index";
import "./style.less";

const Login: React.FC<any> = ({history}) => {
  const [form] = Form.useForm();

  const _handleLogin = () => {
    form.validateFields()
      .then((res: LonginRequest)=> {
        signin(res).then(res=> {
          if(res.status === 200 && res.data) {
            history.push("/");
          } else {
            message.error(res.message);
          }
        })
      })
  }

  const _formProps = {
    required: true,
    showLabel: true
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="title">登录</div>
        <Form 
          form={form}
          layout="vertical"
        >
          <L_FormItem 
            name="username" 
            initialValue="admin"
            label="用户名"
            {..._formProps}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              autoComplete="off" 
              placeholder="用户名" 
              size="large"
              onPressEnter={_handleLogin}
            />
          </L_FormItem>
          <L_FormItem 
            name="password" 
            initialValue="123qweASD"
            label="密码"
            {..._formProps}
          >
            <Input.Password 
              size="large"
              prefix={<LockOutlined />}
              placeholder="密码" 
              onPressEnter={_handleLogin}
            />
          </L_FormItem>
          <Button 
            type="primary"
            size="large"
            className="signin-btn"
            onClick={_handleLogin}
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
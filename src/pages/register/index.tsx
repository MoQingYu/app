import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signup } from "@api/user";
import { L_FormItem } from "@components/index";
import {
  RegisterRequest
} from "@models/user";
import "./style.less";

const Register: React.FC<any> = ({history}) => {
  const [form] = Form.useForm();

  const _handleSingup = () => {
    form.validateFields()
      .then((res: RegisterRequest)=> {
        signup(res).then(res=> {
          if(res.status === 200 && res.data) {
            history.replace("/signin");
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

  const _validatorConfirm = (_: any, value: string) => {
    if(!value) {
      return Promise.reject("请输入")
    }
    const pwd = form.getFieldValue("password");
    if(pwd !== value) {
      return Promise.reject("两次密码不一致")
    }
    return Promise.resolve();
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="title">注册</div>
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
              onPressEnter={_handleSingup}
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
              onPressEnter={_handleSingup}
            />
          </L_FormItem>
          <L_FormItem 
            name="confirmPassword" 
            initialValue="123qweASD"
            label="确认密码"
            rules={[{validator: _validatorConfirm}]}
            {..._formProps}
          >
            <Input.Password 
              size="large"
              prefix={<LockOutlined />}
              placeholder="密码" 
              onPressEnter={_handleSingup}
            />
          </L_FormItem>
          <Button 
            type="primary"
            size="large"
            className="signup-btn"
            onClick={_handleSingup}
          >
            注册
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Register
import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getToken, getLogin } from "@api/login";
import cache from "@utils/cache";
import fetch from "@utils/fetch";
import { SHOP_TOKEN } from "@utils/constants";
import { L_FormItem } from "@components/index";
import "./style.less";

const Login: React.FC<any> = ({history}) => {
  const [form] = Form.useForm();
  const [token, setToken] = useState();
  const [refrashTime, setRefrashTime] = useState(Date.now());
  console.log(history)
  useEffect(()=> {
    _getToken()
  }, [])

  const _getToken = () => {
    getToken().then((res) => {
      if (res) {
        setToken(res.message)
      }
    })
  }

  const _handleRefrashImg = () => setRefrashTime(Date.now())

  const _handleLogin = () => {
    //比对验证码是否正确
    form.validateFields().then((value) => {
      let formData = new FormData()
      formData.append("charCaptcha", value.code);
      formData.append("token", token)
      formData.append("username", value.username)
      formData.append("password", value.password)
      formData.append("scope", "ui")
      formData.append("type", "account")
      formData.append("grant_type", "password")
      formData.append("client_id", "browser")
      formData.append("tenantCode", "10001")
      getLogin(formData).then(data => {
        if (data && data.access_token) {
          cache.set(SHOP_TOKEN, data.access_token);
          fetch.setTokenInHeader(data.access_token);
          history.push("/")
        } else {
          cache.remove(SHOP_TOKEN);
          _getToken()
        }
      }).catch(res=> {
        console.log(res)
        _getToken()
      })
    })
  }

  const _formProps = {
    required: true,
    showLabel: false
  }

  return (
    <div className="login-contianer">
      <div className="login-wrap">
        <div className="login-title">业务营运支撑系统</div>
        <Form form={form}>
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
          <div className="form-code">
            <L_FormItem 
              name="code"
              label="验证码"
              {..._formProps}
            >
              <Input 
                size="large"
                autoComplete="off" 
                placeholder="验证码" 
                onPressEnter={_handleLogin}
              />
            </L_FormItem>
            <L_FormItem className="code">
              <img 
                src={`/api/account/captcha/generateImageCaptcha?randomCode=${refrashTime}&token=${token}`}
                onClick={_handleRefrashImg}
                alt=""
                width="120px"
                height="40px"
              />
            </L_FormItem>
          </div>
          <Button 
            type="primary"
            className="login-btn"
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
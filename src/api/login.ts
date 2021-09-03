import fetch from "@utils/fetch";

export const getToken = () => fetch.get('/api/account/captcha/getToken')

//登录请求
export const getLogin = (params) => fetch.post('/api/uaa/oauth/token', params)
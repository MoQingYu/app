import fetch from "@utils/fetch";
import {
  LonginRequest,
  RegisterRequest
} from "@models/user";

// 用户注册
export const signup = (params: RegisterRequest) => fetch.post<RegisterRequest, boolean>('/api/user/signup', params)

// 用户注册
export const signin = (params: LonginRequest) => fetch.post<LonginRequest, boolean>('/api/user/signin', params)
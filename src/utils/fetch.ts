import { message } from "antd";
import cache from "./cache";
import { SHOP_TOKEN } from "@config/constants";
import {
  ResponseModel,
  ParamsModel,
  FetchMethodModel
} from "@models/fetch";

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '未登录或登录已过期，请重新登录!',
  403: '用户未得到授权，禁止访问!',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

class Fetch {

  headers: Headers;

  constructor() {
    const token: string = cache.get(SHOP_TOKEN);
    // 默认header
    this.headers = new Headers({
      "Authorization": token ? `Bearer ${token}` : "Basic YnJvd3Nlcjo=",
      'Content-Type': "application/json; charset=utf-8"
    });
  }

  isFormData(params: any) {
    return Object.prototype.toString.call(params) === "[object FormData]";
  }

  setHeaders(headers = {}) {
    Object.keys(headers).forEach(d=> {
      this.headers.set(d, headers[d])
    })
  }

  setTokenInHeader(token: string) {
    this.headers.set("Authorization", `Bearer ${token}`);
  }

  send<T>(url, method: FetchMethodModel, params?: ParamsModel): Promise<ResponseModel<T>>  {
    return new Promise<T>((resolve, reject) => {
      fetch(url, {
        method,
        body: params,
        headers: this.headers
      }).then((res)=> {
        if(res.status == 200) {
          resolve(res.json());
        } else {
          this.errorHandle(res);
          reject(res.json);
        }
      })
    })
  }

  errorHandle<T>(res: ResponseModel<T>) {
    const { status } = res;
    if(codeMessage[status]) {
      message.error(codeMessage[status], ()=> {
        if(status == 401) {
          this.headers.set("Authorization",  "Basic YnJvd3Nlcjo=");
          cache.remove(SHOP_TOKEN);
          if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login";
          }
        }
      })
    } else {
      message.error("系统错误")
    }
  } 

  post<T, R>(url: string, params: T = {} as T, headers?: any): Promise<ResponseModel<R>> {
    this.setHeaders(headers);
    let newParams: ParamsModel = "";
    if(this.isFormData(params)) {
      newParams = params as FormData;
    } else if(Object.keys(params)?.length) {
      newParams = JSON.stringify(params);
    }
    return this.send<R>(url, "POST", newParams)
  }
  
  get<T, R>(url: string, params: T = {} as T): Promise<ResponseModel<R>> {
    let newUrl: string = url
    const keys = Object.keys(params);
    if(keys.length) {
      let query =  keys.reduce((list: String[], key)=> {
        list = list.concat(`${key}=${params[key]}`)
        return list;
      }, [])
      newUrl = `${newUrl}?${query.join("&")}`
    }
    return this.send<R>(newUrl, "GET")
  }
}

export default new Fetch()
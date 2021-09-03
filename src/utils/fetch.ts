import { message } from "antd";

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
    this.headers = new Headers({
      "Authorization": "Basic YnJvd3Nlcjo="
    });
  }

  isFormData(params) {
    return Object.prototype.toString.call(params) === "[object FormData]";
  }

  setHeaders(headers = {}) {
    Object.keys(headers).forEach(d=> {
      this.headers.set(d, headers[d])
    })
  }

  setTokenInHeader(token: string) {
    this.headers.set("Authorization", token);
  }

  send(url, method, params?: any): Promise<any>  {
    return new Promise<void>((resolve, reject) => {
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

  errorHandle(res: any) {
    const { status } = res;
    if(codeMessage[status]) {
      message.error(codeMessage[status], ()=> {
        if(status == 401) {
          if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login";
          }
        }
      })
    } else {
      message.error("系统错误")
    }
  } 

  post(url, params = {}, headers?: any): Promise<any> {
    this.setHeaders(headers);
    let newParams: any = "";
    if(this.isFormData(params)) {
      newParams = params;
    } else if(Object.keys(params)?.length) {
      newParams = JSON.stringify(params);
    }
    return this.send(url, "POST", newParams)
  }
  
  get(url, params: any = {}): Promise<any> {
    let newUrl = url
    const keys = Object.keys(params);
    if(keys.length) {
      let query =  keys.reduce((list: String[], key)=> {
        list = list.concat(`${key}=${params[key]}`)
        return list;
      }, [])
      newUrl = `${newUrl}?${query.join("&")}`
    }
    return this.send(newUrl, "GET")
  }
}

export default new Fetch()
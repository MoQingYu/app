import Cookie from "js-cookie";

class MyCache {
  
  static set(key: string, value: any) {
    Cookie.set(key, value, { domain: location.hostname, path: "/", expires: 1 })
  }

  static get(key: string) {
    return Cookie.get(key);
  }

  static remove(key: string) {
    Cookie.remove(key, { path: '/', domain: location.hostname }) 
  }

}

export default MyCache;
import fetch from "@utils/fetch";

// 获取用户信息
export const getSysUser = () => fetch.get('/api/uaa/users/getSysUser')
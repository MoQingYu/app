import fetch from "@utils/fetch";

// 获取用户信息
export const getSysUser = () => fetch.get('/api/uaa/users/getSysUser')

//获取左侧侧边栏的信息
export const getMenuData = (params) => fetch.post('/api/account/sysuserdetail/sysdirectory', params)
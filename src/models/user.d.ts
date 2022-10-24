export type UserReduxModel = {
  info?: UserModel | null;
  routes?: MenuModel[];
}

export type ActionModel = UserReduxModel & {
  type: symbol | string;
}

export type CommonModel = {
  key: string;
  label: string;
}

export type GeographicModel = {
  province: CommonModel;
  citype: CommonModel;
}

export type UserModel = {
  address: string;
  avatar: string;
  currentAuthority: string;
  email: string;
  geographic: GeographicModel
  id: string;
  mobile: string;
  nickname: string;
  notifyMessage: number;
  notifyTodo: number;
  phone: string;
  profile: string;
  username: string;
}

export type MenuModel = {
  hideChildrenInMenu: number;
  hideInMenu: number;
  id: string;
  menuName: string;
  menuType: string;
  name: string;
  parentId: string;
  path: string;
  routes: MenuModel[]
}

export type LonginRequest = {
  username: string
  password: string
}

export type RegisterRequest = LonginRequest & {
  confirmPassword: string
} 

export type RegisterResponse = boolean;
import type { RouteRecordRaw } from 'vue-router';

//定义User仓库数据类型
export interface UserState {
  token: string | null;
  userInfo: userInfo;
  menuRoutes: RouteRecordRaw[];
  buttons:string[];
}

interface userInfo {
  roles: string[];
  username: string;
  avatar: string;
}

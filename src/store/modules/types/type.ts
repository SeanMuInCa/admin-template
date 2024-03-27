//定义User仓库数据类型
export interface UserState {
  token: string | null;
  userInfo: userInfo;
}

interface userInfo {
  desc: string;
  roles: string[];
  username: string;
  avatar: string;
}

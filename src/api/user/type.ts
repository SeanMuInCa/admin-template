//login data type

export interface loginData {
  username: string;
  password: string;
}

//定义共用返回数据类型接口
export interface returnDataTypeCommon {
  code: number;
  message: string;
  ok: boolean;
}

//login return type
export interface loginReturnData extends returnDataTypeCommon {
  data: string;
}

//userinfo data type
interface userinfo {
  routes: string[];
  buttons: string[];
  roles: string[];
  name: string;
  avatar: string;
}

//user info return type
export interface userinfoData extends returnDataTypeCommon {
  data: userinfo;
}

//logout return type
export interface logoutReturnData extends returnDataTypeCommon {
  data: null;
}

//login data type

export interface loginData {
  username: string;
  password: string;
}

interface dataType {
  token?: string;
  message?:string;
}

export interface loginReturnData {
  code: number;
  data: dataType;
}

//userinfo data type
interface userinfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: userinfo;
}
export interface userinfoData {
  code: number;
  data: user;
}

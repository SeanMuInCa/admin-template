//统一管理项目用户相关的接口
import axiosRequest from '@/utils/request';
import type { loginData, loginReturnData, userinfoData, logoutReturnData } from './type';
//统一管理接口

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//login
export const loginRequest = (data: loginData) => axiosRequest.post<loginData, loginReturnData>(API.LOGIN_URL, data);

//userinfo
export const userInfoRequest = () => axiosRequest.get<any, userinfoData>(API.USERINFO_URL);

//logout

export const logoutRequest = () => axiosRequest.post<any, logoutReturnData>(API.LOGOUT_URL);

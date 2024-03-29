//统一管理项目用户相关的接口
import axiosRequest from '@/utils/request';

//统一管理接口

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//login
export const loginRequest = (data: any) => axiosRequest.post<any, any>(API.LOGIN_URL, data);

//userinfo
export const requestInfo = () => axiosRequest.get<any>(API.USERINFO_URL);

//logout

export const logoutRequest = () => axiosRequest.get<any>(API.LOGOUT_URL);

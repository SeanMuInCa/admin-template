//统一管理项目用户相关的接口
import axiosRequest from '@/utils/request';

import { loginData, loginReturnData, userinfoData } from './type';
//统一管理接口

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

//对外暴露请求函数
//login method

export const loginRequest = (data: loginData) => {
  //data:用户登录需要的数据
  return axiosRequest.post<any, loginReturnData>(API.LOGIN_URL, data);
};

//userinfo method

export const infoRequest = () => {
  return axiosRequest.get<any, userinfoData>(API.USERINFO_URL);
};

//create user store

import { defineStore } from 'pinia';
import { loginRequest, userInfoRequest, logoutRequest } from '@/api/user';
import { UserState } from './types/type';
// import { loginData, loginReturnData } from '@/api/user/type';
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token';

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(),
      userInfo: {
        roles: [],
        username: '',
        avatar: '',
      },
    };
  },

  actions: {
    async userLogin(loginInfo: any) {
      const data: any = await loginRequest(loginInfo);
      if (data.code === 200) {
        this.token = data.data as string; //断言
        SET_TOKEN(data.data as string);
        return Promise.resolve(data.ok);
      } else {
        return Promise.reject('failed to login, please check your username and password');
      }
    },

    async userInfoRequest() {
      const data = await userInfoRequest();
      if (data.code === 200) {
        console.log(data);
        this.userInfo.username = data.data.name;
        this.userInfo.roles = data.data.roles;
        this.userInfo.avatar = data.data.avatar;
        return Promise.resolve(data.code);
      } else {
        return Promise.reject('failed to get user info');
      }
    },
    async userLogout() {
      const data = await logoutRequest();
      console.log(data);
      if (data.code === 200) {
        this.token = null;
        this.userInfo.username = '';
        this.userInfo.avatar = '';
        this.userInfo.roles = [];
        DEL_TOKEN();
        return Promise.resolve(data.code);
      } else {
        return Promise.reject('failed to logout');
      }
      // DEL_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;

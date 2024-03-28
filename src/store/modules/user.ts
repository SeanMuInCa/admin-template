//create user store

import { defineStore } from 'pinia';
import { loginRequest, infoRequest } from '@/api/user';
import { UserState } from './types/type';
import { loginData, loginReturnData } from '@/api/user/type';
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token';
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      userInfo: {
        desc: '',
        roles: [],
        username: '',
        avatar: '',
      },
    };
  },

  actions: {
    async userLogin(loginInfo: loginData) {
      const data: loginReturnData = await loginRequest(loginInfo);

      if (data.code === 200) {
        console.log(data);

        this.token = data.data.token as string; //断言
        SET_TOKEN(data.data.token);
        return Promise.resolve(data.code);
      } else {
        return Promise.reject(data.data.message);
      }
    },

    async requestInfo() {
      const data = await infoRequest();
      if (data.code === 200) {
        console.log(data);
        this.userInfo.username = data.data.checkUser.username;
        this.userInfo.desc = data.data.checkUser.desc;
        this.userInfo.roles = data.data.checkUser.roles;
        this.userInfo.avatar = data.data.checkUser.avatar;
        return Promise.resolve(data.code);
      } else {
        return Promise.reject('failed to get user info');
      }
    },
    userLogout() {
      (this.token = null),
        (this.userInfo = {
          desc: '',
          roles: [],
          username: '',
          avatar: '',
        });
      DEL_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;

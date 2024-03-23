//create user store

import { defineStore } from 'pinia';
import { loginRequest } from '@/api/user';
import { UserState } from './types/type';
import { loginData, loginReturnData } from '@/api/user/type';
import { SET_TOKEN, GET_TOKEN } from '@/utils/token';
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    };
  },

  actions: {
    async userLogin(loginInfo: loginData) {
      const data: loginReturnData = await loginRequest(loginInfo);

      if (data.code === 200) {
        this.token = data.data.token as string; //断言
        SET_TOKEN(data.data.token);
        return Promise.resolve(data.code);
      } else {
        return Promise.reject(data.data.message);
      }
    },
  },
  getters: {},
});

export default useUserStore;

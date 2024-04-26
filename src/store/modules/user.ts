//create user store

import { defineStore } from 'pinia';
import { loginRequest, userInfoRequest, logoutRequest } from '@/api/user';
import { UserState } from './types/type';
import type { loginData, loginReturnData, userinfoData, logoutReturnData } from '@/api/user/type';
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token';
import { staticRoutes, asyncRoute, anyRoute } from '@/router/routes';
import { router } from '@/router';

import cloneDeep from 'lodash/cloneDeep';

//定义筛选方法
const filterRoutes = (asyncRoute: any, routes: any) => {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //由于这个赋值，导致了数据变化，因此要用深拷贝来解决这个问题，这里引入
        item.children = filterRoutes(item.children, routes);
      }
      return true;
    }
  });
};

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      //菜单
      menuRoutes: staticRoutes,
      //按钮
      buttons:[],
      userInfo: {
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
        this.token = data.data as string; //断言
        SET_TOKEN(data.data as string);
        return Promise.resolve(data.ok);
      } else {
        return Promise.reject('failed to login, please check your username and password');
      }
    },

    async userInfoRequest() {
      const data: userinfoData = await userInfoRequest();
      if (data.code === 200) {
        this.userInfo.username = data.data.name;
        this.userInfo.roles = data.data.roles;
        this.userInfo.avatar = data.data.avatar;
        this.buttons = data.data.buttons;
        console.log(data);
        const userRoutes = filterRoutes(cloneDeep(asyncRoute), data.data.routes);
        //菜单数据仅仅是菜单数据
        this.menuRoutes = [...staticRoutes, ...userRoutes, anyRoute];
        //追加路由
        [...userRoutes, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        return Promise.resolve(data.code);
      } else {
        return Promise.reject('failed to get user info');
      }
    },
    async userLogout() {
      const data: logoutReturnData = await logoutRequest();
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
    },
  },
  getters: {},
});

export default useUserStore;

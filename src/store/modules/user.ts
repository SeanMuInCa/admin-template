//user相关小仓库

import { defineStore } from "pinia";
// defineStore 方法有两个参数，第一个参数是模块化名字，即应用程序中store的唯一id（相当于身份证一样，不能重复）
// 第二个参数是选项，对象里面有三个属性，相比于 vuex 少了一个 mutations
import { reqLogin, reqInfo, reqLogout } from "@/api/user";
import type { loginForm, loginResponse, userInfoResponse,userLogoutResponse } from "@/api/user/type";
import type { userState } from "./type";
import { routes } from "@/router/index";
const useUserStore = defineStore("User", {
	//存储数据得地方
	state: (): userState => {
		return {
			token: localStorage.getItem("token") || "", //用户唯一标识
			menuRoutes: routes, //菜单路由，在左侧菜单需要的路由配置
			username: "",
			avatar: "",
			desc: "",
		};
	},
	//异步或者逻辑的地方
	actions: {
		//用户登录方法登录请求，都应该用async await
		async userLogin(userInfo: loginForm) {
			const res: loginResponse = await reqLogin(userInfo);
			// console.log(res);
			//从数据看，登录请求200，成功拿到TOKEN，失败返回201并给个信息
			if (res.code === 200) {
				//存起来，本地也要存
				// console.log(res);
				this.token = res.data as string;
				localStorage.setItem("token", this.token);
				return Promise.resolve(); //能保证当前async函数返回一个成功的promise
			} else {
				return Promise.reject(new Error(res.data));
			}
		},
		//获取用户信息
		async getUserInfo() {
			const res: userInfoResponse = await reqInfo();
			// console.log(res);
			//从数据看，登录请求200，成功拿到TOKEN，失败返回201并给个信息
			if (res.code === 200) {
				//存起来，本地也要存
				// console.log(res);
				this.username = res.data.name;
				this.avatar = res.data.avatar;
				this.desc = res.data.roles.toString();
				return Promise.resolve(); //能保证当前async函数返回一个成功的promise
			} else {
				return Promise.reject(new Error(res.message));
			}
		},
		//用户退出
		async userLogout() {
			//目前没有模拟的退出接口，只能先这么写
			// this.username = "";
			// this.token = "";
			// this.desc = "";
			// this.avatar = "";
			// localStorage.removeItem('token')
			const res: userLogoutResponse = await reqLogout();
			// console.log(res);
			//从数据看，登录请求200，成功拿到TOKEN，失败返回201并给个信息
			if (res.code === 200) {
				//存起来，本地也要存
				// console.log(res);
				this.username = "";
				this.token = "";
				this.desc = "";
				this.avatar = "";
				localStorage.removeItem("token");
				return Promise.resolve(); //能保证当前async函数返回一个成功的promise
			} else {
				return Promise.reject(new Error(res.message));
			}
		},
	},
	//计算属性的地方
	getters: {},
});
export default useUserStore;
// reqLogin({
//     username: userInfo.username,
//     password: userInfo.password
// }).then((res) => {console.log(res);
// }).catch((err) => {console.log(err);
// })

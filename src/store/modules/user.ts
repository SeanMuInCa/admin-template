//create user store

import { defineStore } from 'pinia';
import { loginRequest } from '@/api/user';

import { loginData } from '@/api/user/type'


const useUserStore = defineStore('User', {
    state: () => {
        return {
            token: localStorage.getItem('token')
        }
    },

    actions: {
        async userLogin(loginInfo: loginData) {
            const data = await loginRequest(loginInfo);

            if (data.code === 200) {
                this.token = data.data.token;
                localStorage.setItem('token', data.data.token);
                return Promise.resolve(data.code)
            }else{
                return Promise.reject(data.data.message)
            }
        }
    },
    getters:{}

});

export default useUserStore;

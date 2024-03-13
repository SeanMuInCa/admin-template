//关于layout的小仓库，为了保存展开/折叠的判断
import { defineStore } from "pinia";

const userLayoutStore = defineStore('LayoutStore', {
    state:() => {
        return {
            isExpand: true,//控制展开
            refresh: false,//控制刷新按钮
            fullScreen: false,//控制全屏
        }},
    getters: {
        welcome: () => {
            const loginTime = new Date().getHours()
            // console.log(loginTime);
            if(loginTime<7) return '深夜了'
            else if(loginTime<13) return '上午好'
            else if(loginTime<18) return '下午好'
            else return '晚上好'
        }
    },
});

export default userLayoutStore
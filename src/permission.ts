//做路由鉴权,路由能否被访问，在访问前进行操作来判断

import { router } from '@/router/index';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from '@/store';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore(pinia); //不加入pinia会报错

//全局守卫

//前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // to and from are both route objects. must call `next`.
  const token = userStore.token;

  // console.log(token,username);
  //login
  if (token) {
    const username = userStore.userInfo.username;
    if (to.path === '/login') {
      next({ path: '/home' });
    } else {
      // console.log(username);
      next();
      // if(username) {
      //     next();
      // }
      // else{
      //     userStore.requestInfo();
      // }
    }
    //un login
  } else {
    if (to.path == '/login') {
      next();
    } else {
      console.log(1);

      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      });
    }
  }
  nprogress.start();
});

//后置守卫
router.afterEach((to: any, from: any) => {
  // to and from are both route objects.
  nprogress.done();
});

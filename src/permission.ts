//做路由鉴权,路由能否被访问，在访问前进行操作来判断

import { router } from '@/router/index';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from '@/store';
import useUserStore from '@/store/modules/user';

nprogress.configure({ showSpinner: false });
const userStore = useUserStore(pinia); //不加入pinia会报错

//全局守卫

//前置守卫
router.beforeEach(async (to: any, _from: any, next: any) => {
  document.title = `Raina's Home - ${to.meta.title}`;
  // to and from are both route objects. must call `next`.
  const token = userStore.token;
  const username = userStore.userInfo.username;
  console.log(token, username);
  //login
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' });
    } else {
      // console.log(username);
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfoRequest();
          next({ ...to }); //这样写就能确保路由加载完成再刷新
        } catch (error) {
          //发了请求又没有获取到用户信息，说明只能是token过期
          //或者是token被修改了，验证没通过
          await userStore.userLogout();
          router.push({
            path: '/login',
            query: {
              redirect: to.path,
            },
          });
        }
        // await userStore
        //   .requestInfo()
        //   .then((data) => {
        //     console.log('@@@', data);
        //     next();
        //   })
        //   .catch((err) => {
        //     ElNotification({
        //       type: 'error',
        //       message: err,
        //     });
        //     console.log(err);
        //   });
      }
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
router.afterEach((_to: any, _from: any) => {
  // to and from are both route objects.
  nprogress.done();
});

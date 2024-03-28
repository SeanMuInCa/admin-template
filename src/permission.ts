//做路由鉴权,路由能否被访问，在访问前进行操作来判断

import {router} from '@/router/index';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//全局守卫



//前置守卫
router.beforeEach((to:any, from:any, next:any) => {
    // to and from are both route objects. must call `next`.
    nprogress.start();
    console.log(to);
    console.log(from);
    next();
    
})


//后置守卫
router.afterEach((to:any, from:any) => {
    // to and from are both route objects.
    nprogress.done();
})

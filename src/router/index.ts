//通过vue-router实现路由配置
import { createRouter, createWebHashHistory } from 'vue-router';
import { staticRoutes } from './routes';
//create router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

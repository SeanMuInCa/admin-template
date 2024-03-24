//引入路由
import { staticRoutes } from '@/router/routes';

import { defineStore } from 'pinia';

const useRoutesStore = defineStore('Routes', {
  state: () => {
    return {
      menuRoutes: staticRoutes,
    };
  },
});

export default useRoutesStore;

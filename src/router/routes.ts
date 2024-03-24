export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: 'Login',
      showInMenu: true,
      icon: 'House',
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'Layout',
      showInMenu: true,
      icon: 'Edit',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: 'Home',
          showInMenu: true,
          icon: 'Plus',
        },
      },
      {
        path: '/home1',
        component: () => import('@/views/home/index.vue'),
        name: 'home1',
        meta: {
          title: 'Home1',
          showInMenu: true,
          icon: 'Connection',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      showInMenu: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'redirect404',
    meta: {
      title: 'Redirect404',
      showInMenu: true,
    },
  },
];

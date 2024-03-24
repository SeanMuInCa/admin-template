export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: 'Login',
      showInMenu: false,
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'Layout',
      showInMenu: true,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: 'Home',
          showInMenu: true,
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
      showInMenu: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'redirect404',
    meta: {
      title: 'Redirect404',
      showInMenu: false,
    },
  },
];

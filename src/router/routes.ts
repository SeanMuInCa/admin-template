export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: 'Login',
      showInMenu: false,
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
      icon: 'HomeFilled',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: 'Home',
          showInMenu: true,
          icon: 'HomeFilled',
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
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: 'Screen',
      showInMenu: true,
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: 'Management',
      showInMenu: true,
      icon: 'Lock',
    },
    children: [
      {
        path: '/user',
        component: () => import('@/views/acl/User.vue'),
        name: 'User',
        meta: {
          title: 'User Management',
          showInMenu: true,
          icon: 'User',
        },
      },
      {
        path: '/roler',
        component: () => import('@/views/acl/Roler.vue'),
        name: 'Roler',
        meta: {
          title: 'Roles Management',
          showInMenu: true,
          icon: 'Avatar',
        },
      },
      {
        path: '/permission',
        component: () => import('@/views/acl/Permission.vue'),
        name: 'Permission',
        meta: {
          title: 'Permission Management',
          showInMenu: true,
          icon: 'Grid',
        },
      },
    ],
  },
];

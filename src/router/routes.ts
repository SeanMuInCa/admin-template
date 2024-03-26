export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      id: '1',
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
      id: '2',
      title: '',
      showInMenu: false,
      icon: 'HomeFilled',
    },
    redirect: '/home',
    children: [
      {
        id: '2-1',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
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
      id: '3',
      title: '404',
      showInMenu: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'redirect404',
    meta: {
      id: '4',
      title: 'Redirect404',
      showInMenu: false,
    },
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      id: '5',
      title: 'Screen',
      showInMenu: true,
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    redirect: '/acl/user',
    meta: {
      id: '6',
      title: 'Management',
      showInMenu: true,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/User.vue'),
        name: 'User',
        meta: {
          id: '6-1',
          title: 'User Management',
          showInMenu: true,
          icon: 'User',
        },
      },
      {
        path: '/acl/roler',
        component: () => import('@/views/acl/Roler.vue'),
        name: 'Roler',
        meta: {
          id: '6-2',
          title: 'Roles Management',
          showInMenu: true,
          icon: 'Avatar',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/Permission.vue'),
        name: 'Permission',
        meta: {
          id: '6-3',
          title: 'Permission Management',
          showInMenu: true,
          icon: 'Grid',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/brand',
    meta: {
      id: '7',
      title: 'Product Management',
      showInMenu: true,
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/brand',
        component: () => import('@/views/product/Brand.vue'),
        name: 'Brand',
        meta: {
          id: '7-1',
          title: 'Brand Management',
          showInMenu: true,
          icon: 'Suitcase',
        },
      },
      {
        path: '/product/attitude',
        component: () => import('@/views/product/Attitude.vue'),
        name: 'Attitude',
        meta: {
          id: '7-2',
          title: 'Attitude Management',
          showInMenu: true,
          icon: 'Compass',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/SPU.vue'),
        name: 'SPU',
        meta: {
          id: '7-3',
          title: 'SPU Management',
          showInMenu: true,
          icon: 'ShoppingBag',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/SKU.vue'),
        name: 'SKU',
        meta: {
          id: '7-4',
          title: 'SKU Management',
          showInMenu: true,
          icon: 'ShoppingCart',
        },
      },
    ],
  },
];

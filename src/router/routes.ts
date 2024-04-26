//常量路由
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
];

//异步路由
export const asyncRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      id: '6',
      title: 'Management',
      showInMenu: true,
      icon: 'Lock',
    },
    redirect: '/acl/user',
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
        name: 'Role',
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
        name: 'Trademark',
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
        name: 'Attr',
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
        name: 'Spu',
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
        name: 'Sku',
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

//任意路由
export const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'redirect404',
  meta: {
    id: '4',
    title: 'Redirect404',
    showInMenu: false,
  },
};

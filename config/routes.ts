export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '首页',
    icon: 'smile',
    path: '/welcome',
    component: './Welcome',
  },
  {
    path: '/form',
    icon: 'form',
    name: '表单页',
    routes: [
      {
        path: '/form',
        redirect: '/form/basic-form',
      },
      {
        name: '基础表单',
        icon: 'smile',
        path: '/form/basic-form',
        component: './form/basic-form',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '列表',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: '个人页',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/settings',
      },
      {
        name: '个人设置',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

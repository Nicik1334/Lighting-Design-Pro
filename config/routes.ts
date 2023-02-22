// name: 当前路由在菜单和面包屑中的名称，注意这里是国际化配置的 key，具体展示菜单名可以在 /src/locales/zh-CN.ts 进行配置。
// icon: 当前路由在菜单下的图标名。
// hideInMenu: 当前路由在菜单中不展现，默认 false。
// hideChildrenInMenu: 当前路由的子级在菜单中不展现，默认 false。
// hideInBreadcrumb: 当前路由在面包屑中不展现，默认 false。

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
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      {
        name: '首页',
        icon: 'smile',
        path: '/dashboard',
        component: './dashboard',
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
          {
            name: '弹窗表单',
            icon: 'calendar',
            path: '/form/modal-form',
            component: './form/modal-form',
          },
          {
            name: '分步表单',
            icon: 'calendar',
            path: '/form/step-form',
            component: './form/step-form',
          },
        ],
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
        component: './404',
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

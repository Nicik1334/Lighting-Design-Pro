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
        path: '/system',
        icon: 'picLeft',
        name: '系统管理',
        routes: [
          {
            path: '/system',
            redirect: '/system/dictionary',
          },
          {
            name: '字典管理',
            icon: 'smile',
            path: '/system/dictionary',
            component: './system/dictionary',
          },
          {
            name: '人员管理',
            icon: 'user',
            path: '/system/user',
            component: './system/user',
          },
          {
            name: '角色管理',
            icon: 'role',
            path: '/system/role',
            component: './system/role',
          },
          {
            name: '组织管理',
            path: '/system/org',
            component: './system/org',
          },
        ],
      },
      {
        icon: 'smile',
        name: '多级菜单',
        path: '/nested',
        routes: [
          {
            path: '/nested',
            redirect: '/nested/menu1/menu1-1',
          },
          {
            name: '菜单1',
            path: '/nested/menu1',
            routes: [
              {
                path: '/nested/menu1',
                redirect: '/nested/menu1/menu1-1',
              },
              {
                name: '菜单1-1',
                path: '/nested/menu1/menu1-1',
                component: './nested/menu1/menu1-1',
              },
              {
                name: '菜单1-2',
                path: '/nested/menu1/menu1-2',
                routes: [
                  {
                    path: '/nested/menu1/menu1-2',
                    redirect: '/nested/menu1/menu1-2/menu1-2-1',
                  },
                  {
                    name: '菜单1-2-1',
                    path: '/nested/menu1/menu1-2/menu1-2-1',
                    component: './nested/menu1/menu1-2/menu1-2-1',
                  },
                  {
                    name: '菜单1-2-2',
                    path: '/nested/menu1/menu1-2/menu1-2-2',
                    component: './nested/menu1/menu1-2/menu1-2-2',
                  },
                ],
              },
              {
                name: '菜单1-3',
                path: '/nested/menu1/menu1-3',
                component: './nested/menu1/menu1-3',
              },
            ],
          },
          {
            name: '菜单2',
            path: '/nested/menu2',
            component: './nested/menu2',
          },
        ],
      },
      {
        path: '/table',
        icon: 'table',
        name: '列表页',
        routes: [
          {
            path: '/table',
            redirect: '/table/basic-table',
          },
          {
            name: '基础列表',
            icon: 'smile',
            path: '/table/basic-table',
            component: './table/basic-table',
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

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
        icon: 'SmileOutlined',
        path: '/dashboard',
        component: './dashboard',
      },
      {
        name: '大屏幕',
        path: '/dataScreen',
        component: './dataScreen',
        // 不展示顶栏
        headerRender: false,
        // 不展示页脚
        footerRender: false,
        // 不展示菜单
        menuRender: false,
      },
      {
        path: '/form',
        icon: 'FormOutlined',
        name: '表单页',
        routes: [
          {
            path: '/form',
            redirect: '/form/basic-form',
          },
          {
            name: '基础表单',
            path: '/form/basic-form',
            component: './form/basic-form',
          },
          {
            name: '弹窗表单',
            path: '/form/modal-form',
            component: './form/modal-form',
          },
          {
            name: '分步表单',
            path: '/form/step-form',
            component: './form/step-form',
          },
        ],
      },
      {
        path: '/system',
        icon: 'SettingOutlined',
        name: '系统管理',
        routes: [
          {
            path: '/system',
            redirect: '/system/meun',
          },
          {
            name: '菜单管理',
            icon: 'MenuFoldOutlined',
            path: '/system/menu',
            component: './system/menu',
          },
          {
            name: '字典管理',
            icon: 'TagsOutlined',
            path: '/system/dictionary',
            component: './system/dictionary',
          },
          {
            name: '人员管理',
            icon: 'TeamOutlined',
            path: '/system/user',
            component: './system/user',
          },
          {
            name: '角色管理',
            icon: 'UserSwitchOutlined',
            path: '/system/role',
            component: './system/role',
          },
          {
            name: '组织管理',
            icon: 'BranchesOutlined',
            path: '/system/org',
            component: './system/org',
          },
        ],
      },
      {
        icon: 'PicRightOutlined',
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
            path: '/table/basic-table',
            component: './table/basic-table',
          },
        ],
      },
      {
        name: '个人页',
        icon: 'icon--cool-',
        path: '/account',
        routes: [
          {
            path: '/account',
            redirect: '/account/settings',
          },
          {
            name: '个人设置',
            icon: 'icon-huangguan',
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

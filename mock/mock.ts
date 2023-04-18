const ROUTES = [
  {
    menuName: '首页',
    icon: 'icon-tianqi',
    menuUrl: '/dashboard',
  },
  {
    menuName: '大屏幕',
    icon: 'icon-jiazai',
    menuUrl: '/dataScreen',
  },
  {
    menuName: '基础表单',
    menuUrl: '/form/basic-form',
    component: './form/basic-form',
  },
  {
    menuName: '弹窗表单',
    menuUrl: '/form/modal-form',
    component: './form/modal-form',
  },
  {
    menuName: '分步表单',
    menuUrl: '/form/step-form',
    component: './form/step-form',
  },
  {
    menuName: '菜单管理',
    icon: 'MenuFoldOutlined',
    menuUrl: '/system/menu',
    component: './system/menu',
  },
  {
    menuName: '字典管理',
    icon: 'TagsOutlined',
    menuUrl: '/system/dictionary',
    component: './system/dictionary',
  },
  {
    menuName: '人员管理',
    icon: 'TeamOutlined',
    menuUrl: '/system/user',
    component: './system/user',
  },
  {
    menuName: '角色管理',
    icon: 'UserSwitchOutlined',
    menuUrl: '/system/role',
    component: './system/role',
  },
  {
    menuName: '组织管理',
    icon: 'BranchesOutlined',
    menuUrl: '/system/org',
    component: './system/org',
  },
  {
    icon: 'PicRightOutlined',
    menuName: '多级菜单',
    menuUrl: '/nested',
  },
  {
    menuName: '菜单1',
    menuUrl: '/nested/menu1',
  },
  {
    menuName: '菜单1-1',
    menuUrl: '/nested/menu1/menu1-1',
    component: './nested/menu1/menu1-1',
  },
  {
    menuName: '菜单1-2',
    menuUrl: '/nested/menu1/menu1-2',
  },
  {
    menuName: '菜单1-2-1',
    menuUrl: '/nested/menu1/menu1-2/menu1-2-1',
    component: './nested/menu1/menu1-2/menu1-2-1',
  },
  {
    menuName: '菜单1-2-2',
    menuUrl: '/nested/menu1/menu1-2/menu1-2-2',
    component: './nested/menu1/menu1-2/menu1-2-2',
  },
  {
    menuName: '菜单1-3',
    menuUrl: '/nested/menu1/menu1-3',
    component: './nested/menu1/menu1-3',
  },
  {
    menuName: '菜单2',
    menuUrl: '/nested/menu2',
    component: './nested/menu2',
  },
  {
    menuName: '基础列表',
    menuUrl: '/table/basic-table',
    component: './table/basic-table',
  },
  {
    menuName: '个人页',
    icon: 'icon--cool-',
    menuUrl: '/account',
  },
  {
    menuName: '个人设置',
    icon: 'icon-huangguan',
    menuUrl: '/account/settings',
    component: './account/settings',
  },
  {
    menuName: '百度',
    icon: 'icon-dianzan',
    menuUrl: 'http://www.baidu.com',
  },
];

const AUTHURL = [
  '/dashboard',
  '/dataScreen',
  '/form/basic-form',
  '/form/modal-form',
  '/form/step-form',
  '/system/menu',
  '/system/dictionary',
  '/system/user',
  '/system/role',
  '/system/org',
  '/nested',
  '/nested/menu1',
  '/nested/menu1/menu1-1',
  '/nested/menu1/menu1-2',
  '/nested/menu1/menu1-2/menu1-2-1',
  '/nested/menu1/menu1-2/menu1-2-2',
  '/nested/menu1/menu1-3',
  '/nested/menu2',
  '/table',
  '/table/basic-table',
  '/account',
  '/account/settings',
  'http://www.baidu.com',
];

export { ROUTES, AUTHURL };

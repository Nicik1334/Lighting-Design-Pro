import { OrgList } from '../src/pages/system/org/mock';
import { Request, Response } from 'express';
import { mock } from 'mockjs';
import RoleMenuDatas from '../src/pages/system/role/mock';

const UserListData = mock({
  'data|10': [
    {
      id: '@id',
      userName: '@cname',
      'age|18-56': 56,
      'gender|1': ['0', '1'],
      phone:
        /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/,
      'email|1': ['@email("qq.com")'],
      'userStatus|1': ['1', '2', '3'],
      address: '@county(true)',
    },
  ],
});

const dicData1 = [
  {
    id: 6,
    name: '接口数据类型',
    code: 'api_data_type',
    status: 1,
    remark: '接口数据类型',
  },
  {
    id: 3,
    name: '数据状态',
    code: 'data_status',
    status: 1,
    remark: '通用数据状态',
  },
  {
    id: 4,
    name: '后台首页',
    code: 'dashboard',
    status: 1,
    remark: null,
  },
  {
    id: 5,
    name: '性别',
    code: 'sex',
    status: 1,
    remark: null,
  },

  {
    id: 7,
    name: '后台公告类型',
    code: 'backend_notice_type',
    status: 1,
    remark: null,
  },
  {
    id: 8,
    name: '请求方式',
    code: 'request_mode',
    status: 1,
    remark: null,
  },
  {
    id: 9,
    name: '队列生产状态',
    code: 'queue_produce_status',
    status: 1,
    remark: null,
  },
  {
    id: 10,
    name: '队列消费状态',
    code: 'queue_consume_status',
    status: 1,
    remark: null,
  },
  {
    id: 11,
    name: '队列消息类型',
    code: 'queue_msg_type',
    status: 1,
    remark: null,
  },
];

const dicData2 = [
  {
    id: 14,
    type_id: 6,
    label: 'String',
    value: '1',
    code: 'api_data_type',
    sort: 7,
    status: 1,
    created_at: '2022-11-23 10:49:00',
    updated_at: '2022-11-23 10:49:00',
    remark: null,
  },
  {
    id: 15,
    type_id: 6,
    label: 'Integer',
    value: '2',
    code: 'api_data_type',
    sort: 6,
    status: 1,
    created_at: '2022-11-23 10:49:29',
    updated_at: '2022-11-23 10:49:29',
    remark: null,
  },
  {
    id: 16,
    type_id: 6,
    label: 'Array',
    value: '3',
    code: 'api_data_type',
    sort: 5,
    status: 1,
    created_at: '2022-11-23 10:49:38',
    updated_at: '2022-11-23 10:49:38',
    remark: null,
  },
  {
    id: 17,
    type_id: 6,
    label: 'Float',
    value: '4',
    code: 'api_data_type',
    sort: 4,
    status: 1,
    created_at: '2022-11-23 10:49:46',
    updated_at: '2022-11-23 10:49:46',
    remark: null,
  },
  {
    id: 18,
    type_id: 6,
    label: 'Boolean',
    value: '5',
    code: 'api_data_type',
    sort: 3,
    status: 1,
    created_at: '2022-11-23 10:49:54',
    updated_at: '2022-11-23 10:49:54',
    remark: null,
  },
  {
    id: 19,
    type_id: 6,
    label: 'Enum',
    value: '6',
    code: 'api_data_type',
    sort: 2,
    status: 1,
    created_at: '2022-11-23 10:50:17',
    updated_at: '2022-11-23 10:50:17',
    remark: null,
  },
  {
    id: 20,
    type_id: 6,
    label: 'Object',
    value: '7',
    code: 'api_data_type',
    sort: 1,
    status: 1,
    created_at: '2022-11-23 10:50:26',
    updated_at: '2023-01-09 10:16:26',
    remark: null,
  },
  {
    id: 21,
    type_id: 6,
    label: 'File',
    value: '8',
    code: 'api_data_type',
    sort: 0,
    status: 1,
    created_at: '2021-12-25 18:32:48',
    updated_at: '2023-02-09 02:24:19',
    remark: null,
  },
];

const RoleData = [
  {
    roleId: 1,
    roleName: '系统管理员',
    roleDesc: '进行系统性的参数配置',
    state: 1,
    createTime: '2022-04-20 15:12:45',
  },
  {
    roleId: 2,
    roleName: '普通用户',
    roleDesc: '普通用户',
    state: 1,
    createTime: '2022-11-03 16:36:27',
  },
];

const OrgDatas = [
  {
    id: 0,
    parent_id: 0,
    value: '',
    label: '所有公司',
  },
  {
    id: 58,
    parent_id: 1,
    value: 58,
    label: '总公司',
    children: [
      {
        id: 59,
        parent_id: 58,
        value: 59,
        label: '重庆分公司',
        children: [
          {
            id: 15,
            parent_id: 15,
            value: 15,
            label: '渝北区分公司',
          },
          {
            id: 16,
            parent_id: 16,
            value: 16,
            label: '渝中区分公司',
          },
          {
            id: 17,
            parent_id: 17,
            value: 17,
            label: '九龙坡区分公司',
          },
        ],
      },
      {
        id: 60,
        parent_id: 60,
        value: 60,
        label: '杭州分公司',
      },
      {
        id: 61,
        parent_id: 61,
        value: 61,
        label: '上海分公司',
      },
    ],
  },
];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/getUserList': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      code: '200',
      success: true,
      data: UserListData.data,
      total: UserListData.data.length,
    });
  },
  'POST /api/getdictList': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      code: '200',
      success: true,
      data: dicData1,
      total: dicData1.length,
    });
  },
  'GET /api/getDetailList': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      code: '200',
      success: true,
      data: dicData2,
    });
  },
  'POST /api/pageRole': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      code: '200',
      success: true,
      data: RoleData,
    });
  },
  'GET /api/getCheckedRoleTreeNode': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: '200',
      success: true,
      data: {
        ...RoleMenuDatas,
      },
    });
  },
  'GET /api/getOrgChildren': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: '200',
      success: true,
      data: OrgList,
    });
  },
  'GET /api/OrgController/getOrgChildren': async (req: Request, res: Response) => {
    await waitTime(1000);
    res.send({
      code: '200',
      success: true,
      data: OrgList,
    });
  },
};

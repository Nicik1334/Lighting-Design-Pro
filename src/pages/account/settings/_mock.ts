import type { Request, Response } from 'express';

const city = require('./geographic/city.json');
const province = require('./geographic/province.json');

function getProvince(_: Request, res: Response) {
  return res.json({
    data: province,
  });
}

function getCity(req: Request, res: Response) {
  return res.json({
    data: city[req.params.province],
  });
}

function getCurrentUse(req: Request, res: Response) {
  return res.json({
    data: {
      name: '胡图图',
      avatar:
        'http://mms2.baidu.com/it/u=2802105847,948817052&fm=253&app=138&f=JPEG&fmt=auto&q=75?w=500&h=500',
      userid: '9999',
      email: '189xxxxxx@qq.com',
      profile:
        '我的名字是胡图图，我是一个爱动脑筋的小孩哦。我父亲的名字是胡英俊，我母亲的名字是张小丽。我家住在翻斗花园2号楼1001室。',
      title: '交互专家',
      group: '翻斗花园2号楼1001室',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '重庆市',
          key: '500000',
        },
        city: {
          label: '市辖区',
          key: '500100',
        },
      },
      address: '翻斗花园2号楼1001室',
      phone: '+086-1826666666',
    },
  });
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET  /api/accountSettingCurrentUser': getCurrentUse,
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};

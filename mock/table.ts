import { Request, Response } from 'express';
import { mock } from 'mockjs';

const tableListData = mock({
  'data|10': [
    {
      id: '@id',
      name: '@cname',
      'age|3-56': 20,
      makeDate: '@time',
      phone:
        /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/,
      'mold|1': [
        {
          label: '舒适性',
          value: '1',
        },
        {
          label: '经济性',
          value: '2',
        },
        {
          label: '无痛性',
          value: '3',
        },
      ],
      'makeSource|1': [
        {
          label: '门店',
          value: '1',
        },
        {
          label: '美团',
          value: '2',
        },
        {
          label: '微信',
          value: '3',
        },
      ],
      'personType|1': [
        {
          label: '成人',
          value: '1',
        },
        {
          label: '儿童',
          value: '2',
        },
      ],
      'makeProject|1': [
        {
          label: '种牙',
          value: '1',
        },
        {
          label: '补牙',
          value: '2',
        },
        {
          label: '拔牙',
          value: '3',
        },
      ],
    },
  ],
});

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/tableListData': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      code: '200',
      success: true,
      data: tableListData.data,
      total: tableListData.data.length,
    });
  },
};

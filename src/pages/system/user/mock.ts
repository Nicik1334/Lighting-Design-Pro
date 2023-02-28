import { mock } from 'mockjs';

const MockData = mock({
  'data|100': [
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
const apis = [
  {
    url: '/getAllUserList',
    method: 'post',
    response: () => {
      const data = mock(MockData);
      return {
        code: 200,
        message: 'ok',
        data: data.data,
      };
    },
  },
];

export { apis, MockData };

const data = [
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

const data2 = [
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

export function apiGetdictList(): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: data,
        total: data.length,
        success: true,
      });
    }, 1000);
  });
}

export function apiGetDetailList(id: number | undefined = undefined): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id) {
        resolve({
          data: data2,
          total: data2.length,
          success: true,
        });
      } else {
        resolve({
          data: [],
          total: 0,
          success: false,
        });
      }
    }, 1000);
  });
}

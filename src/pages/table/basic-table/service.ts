const data = [
  {
    key: '1',
    name: 'John Brown',
    makeDate: '2023-02-01',
    makeProjectName: '补牙',
    makeSource: '3',
    makeSourceName: '微信',
    type: '1',
    typeName: '舒适性',
    personType: '儿童',
  },
  {
    key: '2',
    name: 'Jim Green',
    makeDate: '2023-02-01',
    makeSource: '1',
    makeProjectName: '补牙',
    makeSourceName: '门店',
    type: '3',
    typeName: '无痛性',
    personType: '儿童',
  },
  {
    key: '3',
    name: 'Joe Black',
    makeDate: '2023-02-01',
    makeSource: '1',
    makeProjectName: '种牙',
    makeSourceName: '门店',
    type: '1',
    typeName: '舒适性',
    personType: '儿童',
  },
  {
    key: '4',
    name: 'Joe yellow',
    makeDate: '2023-02-01',
    makeSource: '3',
    makeProjectName: '补牙',
    makeSourceName: '微信',
    typeName: '舒适性',
    type: '1',
    personType: '成人',
  },
  {
    key: '5',
    name: 'Joe blue',
    makeDate: '2023-02-01',
    makeSource: '2',
    makeProjectName: '拔牙',
    makeSourceName: '美团',
    typeName: '舒适性',
    type: '1',
    personType: '成人',
  },
  {
    key: '6',
    name: 'Joe Black',
    makeDate: '2023-02-01',
    makeSource: '3',
    makeProjectName: '种牙',
    makeSourceName: '微信',
    type: '2',
    typeName: '经济性',
    personType: '儿童',
  },
  {
    key: '7',
    name: 'Joe Black',
    makeDate: '2023-02-01',
    makeSource: '2',
    makeProjectName: '种牙',
    makeSourceName: '美团',
    type: '2',
    typeName: '经济性',
    personType: '儿童',
  },
];

export interface ColumnsItemType {
  key: string;
  name: string;
  makeDate: string;
  makeSource: string;
  makeProjectName: string;
  makeSourceName: string;
  type: string;
  typeName: string;
  personType: string;
}

export function apiGetUserList(): Promise<Record<string, any>> {
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

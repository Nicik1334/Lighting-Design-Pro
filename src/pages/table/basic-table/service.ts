import { get, post } from '@/utils/http';

export interface ColumnsItemType {
  id: number;
  name: string;
  makeDate: string;
  phone: number;
  mold: { value: string; label: string }[];
  makeSource: { value: string; label: string }[];
  personType: { value: string; label: string }[];
  makeProject: { value: string; label: string }[];
}

// 获取当前的用户
export const getTableList = (param: any) => post('/api/tableListData', param);

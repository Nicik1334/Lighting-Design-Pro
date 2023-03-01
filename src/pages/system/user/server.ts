import { get, post } from '@/utils/http';

// 获取当前的用户
export const getUserList = (param: any) => post('/api/getUserList', param);

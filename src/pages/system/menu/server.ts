import { get, post } from '@/utils/http';

// 获取菜单加按钮
export const getMenuList = (param: any) => get('/api/getMenuList', param);

// 获取菜单
export const getMenuItem = (param: any) => get('/api/getMenuItem', param);

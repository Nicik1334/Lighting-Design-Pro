import { get, post } from '@/utils/http';

// 获取角色
export const getPageRole = (param: any) => post('/api/pageRole', param);

// 获取菜单路由
export const getTreeNode = (param: any) => get('/api/getCheckedRoleTreeNode', param);

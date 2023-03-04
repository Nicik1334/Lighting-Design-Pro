import { get, post } from '@/utils/http';

// 获取组织
export const OrgController = (param: any) => get('/api/OrgController/getOrgChildren', param);

interface HttpResult<T = any> {
  code: number;
  success: boolean;
  data: T;
  msg: string;
}

interface MenuType {
  nodeId: string;
  nodeName: string;
  leaf: boolean;
  icon: string;
  nodeData: {
    icon: string;
    menuCode: string;
    menuName: string;
    menuUrl: string;
    menuType: number;
    menuDesc: string;
  };
  children?: MenuType[];
  topUrl?: string;
  parents?: MenuParentType[];
}

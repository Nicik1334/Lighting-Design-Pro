export type TagsItemType = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 图标
   */
  icon?: string | any;
  /**
   * 路由
   */
  path?: string;
  /**
   * 路由展示标识
   */
  active: boolean;
  /**
   * query参数
   */
  query?: any;
  location?: Location | any;
  /**
   * children
   */
  children?: React.ReactNode;
};

export interface TabsMenuProps {
  /**
   * 菜单列表
   */
  tabList: TagsItemType[];
  /**
   * 缓存key
   */
  cacheKeyMap: Record<string, any>;
  /**
   * 关闭当前标签
   */
  closePage: (tagVal: TagsItemType) => void;
  /**
   * 关闭所有标签
   */
  closeAllPage: () => void;
  /**
   * 关闭其他标签
   */
  closeOtherPage: () => void;
  /**
   * 刷新标签
   */
  refreshPage: (tagVal: TagsItemType) => void;
}

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key;
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

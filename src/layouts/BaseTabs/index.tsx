/* eslint-disable @typescript-eslint/no-use-before-define */
import { LOGIN_PATH, NOT_PATH, TABS_LIST } from '@/constants';
import type { RouteContextType } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@umijs/route-utils';
import React, { createContext, memo, useEffect, useRef, useState, useContext } from 'react';
import { history, useAccess, useLocation, useModel } from 'umi';
import TabsMenu from './TabsMenu';
import type { TagsItemType } from './TabsMenu/data';

interface BaseTabsProps {
  /**
   * 首页路由
   */
  home: string;
}

interface BaseTabsContextProps {
  /**
   * 关闭所有标签
   */
  handleCloseAll: () => void;
  /**
   * 关闭其他标签
   */
  handleCloseOther: () => void;
  /**
   * 关闭当前标签
   */
  handleClosePage: (
    tag?:
      | {
          path?: string;
        }
      | ((t: TagsItemType) => TagsItemType),
  ) => void;
  /**
   * 刷新选择的标签
   */
  handleRefreshPage: (
    tag?:
      | {
          path?: string;
        }
      | ((t: TagsItemType) => TagsItemType),
  ) => void | any;
}

export const BaseTabsContext = createContext<BaseTabsContextProps>({
  handleCloseAll: () => {},
  handleClosePage: () => {},
  handleCloseOther: () => {},
  handleRefreshPage: () => {},
});

let hasOpen = false; // 判断是否已打开过该页面
/**
 * @component BaseTabs 标签页组件
 */
const BaseTabs: React.FC<BaseTabsProps> = memo(({ children, home }) => {
  const access = useAccess();
  const location = useLocation();
  const { initialState } = useModel('@@initialState');
  const [tabList, setTabList] = useState<TagsItemType[]>(() => {
    return JSON.parse(sessionStorage.getItem(TABS_LIST) || '[]');
  });
  const currPath = useRef<string>();
  const routeContext = useContext(RouteContext);

  const [cacheKeyMap, setCacheKeyMap] = useState<Record<string, any>>({});

  // 递归获取重定向路由
  const currentRoute = (
    path: string,
    list: MenuDataItem[],
    keyList: MenuDataItem[] = [],
  ): MenuDataItem[] => {
    list.forEach((node) => {
      if (node.children) currentRoute(path, node.children, keyList);
      if (node.path === path) keyList.push(node);
    });
    return keyList;
  };

  // 递归未设置权限的路由
  const notAccessRoutes = (list: MenuDataItem[], keyList: string[] = []) => {
    list.forEach((node) => {
      if (node.children) notAccessRoutes(node.children, keyList);
      if (!node.access && node.path) keyList.push(node.path);
    });
    return keyList;
  };

  // 缓存tag标签
  const setTagStorage = (list: TagsItemType[]) => {
    setTabList(list);
    if (initialState?.settings?.tabView && initialState?.settings?.tabView?.cacheTabView) {
      const tagsList = list.map((item) => {
        return {
          ...item,
          children: null,
          icon:
            typeof item.icon === 'string'
              ? item.icon
              : item.icon?.type.render.name || item.icon?.props.type || item.icon,
        };
      });
      sessionStorage.setItem(TABS_LIST, JSON.stringify(tagsList));
    } else if (sessionStorage.getItem(TABS_LIST)) {
      sessionStorage.removeItem(TABS_LIST);
    }
  };

  // 关闭所有标签
  const handleCloseAll = () => {
    history.push(home);
    const tabItem = tabList.find((el) => el.path === home);
    const homeData = [];
    //判断路由栏是否有首页标签
    if (tabItem) {
      homeData.push({ ...tabItem, children, active: true, location });
    } else {
      const menuData = routeContext.menuData || [];
      const homeItem = currentRoute(home, menuData)[0];
      homeData.push({
        title: homeItem.name,
        path: home,
        children,
        active: true,
        location,
      });
    }
    setTagStorage(homeData);
  };

  // 关闭标签
  const handleClosePage = (tag: TagsItemType) => {
    // 如果剩余一个标签则关闭所有
    if (tabList.length <= 1) return handleCloseAll();
    const tagsList = [...tabList];
    // 判断关闭标签是否处于打开状态
    tagsList.find((el, i) => {
      if (el.path === tag.path && tag.active) {
        // 关闭当前路由后，跳转到左边，如果左边没路由则跳转到右边
        const next = tabList[i - 1] || tabList[i + 1];
        next.active = true;
        const search = (next?.location?.search as Location) || '';
        history.push(`${next.path}${search}`);
        return true;
      }
      return false;
    });
    const newList = tagsList.filter((el) => el.path !== tag.path);
    setTagStorage(newList);
  };

  // 关闭其他标签
  const handleCloseOther = () => {
    const tabItem = tabList.find((el) => el.active);
    if (tabItem) setTagStorage([tabItem]);
  };

  // 刷新选择的标签
  const handleRefreshPage = (tag: TagsItemType) => {
    const { path: pathname } = tag;
    const tagsList = tabList.map((item) => {
      if (item.path === tag.path) return { ...item, active: true };
      return { ...item, active: false };
    });
    setCacheKeyMap((key: any) => ({
      ...key,
      [pathname as string]: Math.random(),
    }));
    setTagStorage(tagsList);
  };

  // 校验并跳转到404
  const toAuth = () => {
    const { pathname } = location;
    if (pathname !== NOT_PATH) history.push(NOT_PATH);
    const newTabList = [...tabList].map((item) => ({ ...item, active: item.path === NOT_PATH }));
    // 判断当前tabList是否存在404路由，没有则push
    if (!newTabList.find((item) => item.path === NOT_PATH)) {
      newTabList.push({
        title: NOT_PATH,
        path: NOT_PATH,
        children,
        active: true,
      });
    }
    setTagStorage(newTabList);
  };

  // 监听路由改变 routeContext为当前路由信息
  const handleOnChange = (route: RouteContextType) => {
    const { menuData = [], currentMenu } = route;
    const { pathname } = window.location;
    const { path, redirect } = currentMenu as MenuDataItem;
    // (1)当前为登录页面则不进行初始化
    if (pathname === LOGIN_PATH) return;
    // (2)当前路由是否有效？，当前路由是否有权限？(routes未设置access则跳过)
    if (
      !path ||
      (!access.access({ path: pathname }) && !notAccessRoutes(menuData).includes(pathname))
    )
      return toAuth();
    // (3)有redirect则跳转重定向
    if (redirect) return history.replace(redirect);

    // 正常初始化跳转
    hasOpen = false; // 判断是否打开
    const tabNewList = tabList.map((item) => {
      if (path === item.path) {
        hasOpen = true;
        return {
          ...item,
          title: item.path === NOT_PATH ? item.path : item.title,
          active: true,
          location,
          children,
        };
      } else {
        return { ...item, active: false };
      }
    });
    if (!hasOpen) {
      tabNewList.push({
        title: pathname === NOT_PATH ? pathname : currentMenu?.name,
        path,
        children,
        active: true,
        icon: currentMenu?.icon,
        location,
      });
    }
    setTagStorage(tabNewList);
  };

  useEffect(() => {
    if (routeContext && currPath.current !== location.pathname) {
      currPath.current = routeContext?.currentMenu?.path;
      handleOnChange(routeContext);
    }
  }, [routeContext]);

  return (
    <BaseTabsContext.Provider
      value={{
        handleCloseAll,
        handleCloseOther,
        handleClosePage: (close) => {
          const currentTag = tabList.find(
            (item) => item.path === window.location.pathname,
          ) as TagsItemType;
          handleClosePage(
            typeof close === 'function'
              ? close(currentTag)
              : close?.path
              ? (close as TagsItemType)
              : currentTag,
          );
        },
        handleRefreshPage: (refresh) => {
          const currentTag = tabList.find(
            (item) => item.path === window.location.pathname,
          ) as TagsItemType;
          handleRefreshPage(
            typeof refresh === 'function'
              ? refresh(currentTag)
              : refresh?.path
              ? (refresh as TagsItemType)
              : currentTag,
          );
        },
      }}
    >
      <TabsMenu
        {...{
          tabList,
          cacheKeyMap,
          closePage: handleClosePage,
          closeAllPage: handleCloseAll,
          closeOtherPage: handleCloseOther,
          refreshPage: handleRefreshPage,
        }}
      />
    </BaseTabsContext.Provider>
  );
});

export default BaseTabs;

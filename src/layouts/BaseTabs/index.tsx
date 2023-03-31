/* eslint-disable @typescript-eslint/no-use-before-define */
import { LOGIN_PATH, NOT_PATH, TABS_LIST } from '@/constants';
import type { RouteContextType } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@umijs/route-utils';
import React, { createContext, memo, useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { history, KeepAlive, useAccess, useAliveController, useModel } from 'umi';
import TabsMenu from './TabsMenu';
import type { TagsItemType } from './TabsMenu/data';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useUnmount } from 'ahooks';

interface BaseTabsProps {
  /**
   * 首页路由
   */
  home: string;
  /**
   * 缓存key
   */
  aliveKey: string;
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
const BaseTabs: React.FC<BaseTabsProps> = memo(({ children, home, aliveKey }) => {
  const access = useAccess();
  const { initialState } = useModel('@@initialState');
  const [tabList, setTabList] = useState<TagsItemType[]>(() => {
    return JSON.parse(sessionStorage.getItem(TABS_LIST) || '[]');
  });
  const [pathKey, setPathKey] = useState<string>();
  const currPath = useRef<string>();
  const routeContext = useContext(RouteContext);
  const { dropScope, refreshScope, clear, getCachingNodes } = useAliveController();
  // 获取缓存列表
  const cachingNodes = getCachingNodes();

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
    if (initialState?.settings?.tabView && initialState?.settings?.tabView?.cacheTabView) {
      const tagsList = list.map((item) => {
        return {
          ...item,
          icon:
            typeof item.icon === 'string' ? item.icon : item.icon?.type.render.name || item.icon,
        };
      });
      sessionStorage.setItem(TABS_LIST, JSON.stringify(tagsList));
    } else if (sessionStorage.getItem(TABS_LIST)) {
      sessionStorage.removeItem(TABS_LIST);
    }
  };

  // 关闭所有标签
  const handleCloseAll = () => {
    clear();
    history.push(home);
    setPathKey(home);
    const tabItem = tabList.find((el) => el.path === home);
    let homeData = [];
    //判断路由栏是否有首页标签
    if (tabItem) {
      homeData = [{ ...tabItem, refresh: 0, active: true }];
    } else {
      const menuData = routeContext.menuData || [];
      const homeItem = currentRoute(home, menuData)[0];
      homeData = [
        {
          title: homeItem.name,
          path: home,
          refresh: 0,
          active: true,
        },
      ];
    }
    setTagStorage([]);
    setTabList(homeData);
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
        history.push({ pathname: next.path, query: next.query });
        return true;
      }
      return false;
    });
    const newList = tagsList.filter((el) => el.path !== tag.path);
    setTagStorage(newList);
    setTabList(newList);
    dropScope(tag.path as string);
  };

  // 关闭其他标签
  const handleCloseOther = () => {
    clear();
    const tabItem = tabList.find((el) => el.active);
    if (tabItem) {
      setTagStorage([tabItem]);
      setTabList([tabItem]);
    }
  };

  // 刷新选择的标签
  const handleRefreshPage = (tag: TagsItemType) => {
    const { path: pathname, query } = tag;
    const tagsList = tabList.map((item) => {
      if (item.path === tag.path) {
        history.push({ pathname, query });
        return {
          ...item,
          refresh: item.refresh + 1,
          active: true,
        };
      }
      return { ...item, active: false };
    });
    setTabList([...tagsList]);
    setTagStorage(tagsList);
    refreshScope(pathname as string);
  };

  // 校验并跳转到404
  const toAuth = (to?: boolean) => {
    const { pathname } = window.location;
    if (!to && pathname !== NOT_PATH) history.push({ pathname: NOT_PATH });
    const newTabList = [...tabList].map((item) => ({ ...item, active: item.path === NOT_PATH }));

    // 判断当前tabList是否存在404路由，没有则push
    if (!newTabList.find((item) => item.path === NOT_PATH)) {
      newTabList.push({
        title: NOT_PATH,
        path: NOT_PATH,
        refresh: 0,
        active: true,
      });
    }

    // 判断当前tabList是否存在无权限路由，有则splice删除
    if (newTabList.find((item) => item.path !== NOT_PATH && item.path === pathname)) {
      newTabList.splice(
        newTabList.findIndex((item) => item.path === pathname),
        1,
      );
    }

    setTagStorage(newTabList);
    setPathKey(NOT_PATH);
    setTabList(newTabList);
    return false;
  };

  // 校验异常路由
  const routeDecide = (menuData: MenuDataItem[]) => {
    const { pathname } = window.location;
    // (1)当前为登录页面则不进行初始化
    if (pathname === LOGIN_PATH) return false;
    // (2)当前为404页面则重新set
    if (pathname === NOT_PATH) return toAuth(false);
    // (3)当前路由是否有权限(未设置则跳过)
    // if (!access.access({ path: pathname }) && !notAccessRoutes(menuData).includes(pathname))
    //   return toAuth();
    return true;
  };

  // 监听路由改变 routeContext为当前路由信息
  const handleOnChange = (route: RouteContextType) => {
    const { menuData = [], currentMenu } = route;
    if (!routeDecide(menuData)) return;
    const { pathname } = window.location;

    const { path, redirect } = currentMenu as MenuDataItem;
    // 有redirect则跳转重定向
    if (redirect) {
      const itemData = currentRoute(redirect, menuData)[0];
      if (itemData) {
        history.replace({ pathname: redirect });
        setPathKey(redirect);
        if (!tabList.find((item) => item.path === redirect)) {
          setTabList([
            ...tabList,
            {
              title: itemData.name,
              path: redirect,
              refresh: 0,
              active: true,
              icon: itemData.icon,
            },
          ]);
        }
        return;
      }
      return toAuth();
    }

    // 正常初始化跳转
    if (path) {
      hasOpen = false;
      const tabNewList = tabList.map((item) => {
        if (path === item.path) {
          hasOpen = true;
          return {
            ...item,
            title: item.path === NOT_PATH ? item.path : item.title,
            active: true,
          };
        } else {
          return { ...item, active: false };
        }
      });
      if (!hasOpen) {
        tabNewList.push({
          title: pathname === NOT_PATH ? pathname : currentMenu?.name,
          path,
          refresh: 0,
          active: true,
          icon: currentMenu?.icon,
        });
      }
      setTagStorage(tabNewList);
      setPathKey(path);
      setTabList(tabNewList);
      return;
    }
    // 否则跳转404
    return toAuth();
  };

  useEffect(() => {
    if (routeContext && currPath.current !== window.location.pathname) {
      currPath.current = routeContext?.currentMenu?.path;
      handleOnChange(routeContext);
    }
  }, [routeContext]);

  useEffect(() => {
    // console.log(cachingNodes);
  }, [cachingNodes]);

  useUnmount(() => {
    clear();
  });

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
          closePage: handleClosePage,
          closeAllPage: handleCloseAll,
          closeOtherPage: handleCloseOther,
          refreshPage: handleRefreshPage,
          activeKey: pathKey,
        }}
      >
        {pathKey && (
          <TransitionGroup>
            <CSSTransition
              key={pathKey}
              classNames={{
                enter: 'animate__animated',
                enterActive: 'animate__fadeIn',
                exit: 'animate__animated',
                exitActive: 'animate__fadeOut',
              }}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              exit={false}
            >
              {/* @ts-ignore  */}
              <KeepAlive when id={aliveKey} name={aliveKey}>
                {children}
              </KeepAlive>
            </CSSTransition>
          </TransitionGroup>
        )}
      </TabsMenu>
    </BaseTabsContext.Provider>
  );
});

export default BaseTabs;

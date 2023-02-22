import type { RouteContextType } from '@ant-design/pro-layout';
import { RouteContext } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@umijs/route-utils';
import { parse } from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import TabsMenu from './TabsMenu';

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
  /**
   * children
   */
  children?: React.ReactNode;
  /**
   * 刷新次数
   */
  refresh: number;
};

interface TagViewProps {
  /**
   * 首页路由
   */
  home: string;
}

/**
 * @component TagView 标签页组件
 */
const TagView: React.FC<TagViewProps> = ({ children, home }) => {
  const [tagList, setTagList] = useState<TagsItemType[]>([]);
  const [_, setCurrentPath] = useState<any>();
  const [pathKey, setPathKey] = useState<any>('');
  const routeContextRef = useRef<RouteContextType>();

  //递归获取重定向路由
  const currentData = (path: string, list: MenuDataItem[], keyList: MenuDataItem[]) => {
    list.forEach((node) => {
      if (node.children) currentData(path, node.children.reverse(), keyList);
      if (node.path === path) keyList.push(node);
    });
    return keyList;
  };

  // 初始化 visitedViews
  const initTags = (routeContext: RouteContextType) => {
    const { menuData = [], currentMenu } = routeContext;
    const query = parse(history.location.search);
    const { path, redirect } = currentMenu as MenuDataItem;
    if (redirect) {
      // 路由找不到则重定向父路由
      // history.push({ pathname: redirect, query });
      setPathKey(redirect);
      const ItemData = currentData(redirect, menuData.reverse(), [])[0];
      setTagList([
        {
          title: ItemData?.name,
          path: redirect,
          children,
          refresh: 0,
          active: true,
          icon: ItemData?.icon,
        },
      ]);
    } else {
      switch (path) {
        case undefined:
          // 如果'path'与'redirect'都为undefined则重定向404
          history.push({ pathname: '/404', query });
          setPathKey('/404');
          setTagList([
            {
              title: '404',
              path: '/404',
              children,
              refresh: 0,
              active: true,
            },
          ]);
          break;
        default:
          // 正常跳转
          // history.push({ pathname: path, query });
          setPathKey(path);
          setTagList([
            {
              title: currentMenu?.name,
              path,
              children,
              refresh: 0,
              active: true,
              icon: currentMenu?.icon,
            },
          ]);
          break;
      }
    }
  };

  // 监听路由改变 routeContext为当前路由信息
  const handleOnChange = (routeContext: RouteContextType) => {
    const { currentMenu } = routeContext;
    if (tagList.length === 0) return initTags(routeContext); // 初始化
    let hasOpen = false; // 判断是否已打开过该页面
    debugger;
    const tagsList = tagList.map((item) => {
      if (currentMenu?.path === item.path) {
        hasOpen = true;
        // 刷新浏览器时，重新覆盖当前 path 的 children
        return { ...item, active: true, children };
      } else {
        return { ...item, active: false };
      }
    });
    // 没有该tag时追加一个,并打开这个tag页面
    // 刷新页面后 tagList为[]（已被上面拦截）
    if (!hasOpen) {
      const query = parse(history.location.search);
      if (currentMenu?.redirect) {
        // 如果跳转有redirect属性，则跳转到redirect 比如history.push('/'),history.push('/form')
        history.push({ pathname: currentMenu?.redirect, query });
        setPathKey(currentMenu?.redirect);
        setTagList(tagsList);
        return;
      }
      // -------------------------
      const path = currentMenu?.path;
      if (path) {
        tagsList.push({
          title: routeContext.title || '',
          path,
          children,
          refresh: 0,
          active: true,
          icon: currentMenu?.icon,
        });
        history.push({ pathname: path, query });
      }
    }
    setPathKey(currentMenu?.path);
    setTagList(tagsList);
  };

  // 关闭所有标签
  const handleCloseAll = () => {
    history.push(home);
    const tagsList = tagList.find((el) => el.path === home);
    //判断路由栏是否有首页标签
    if (tagsList) {
      setTagList([{ ...tagsList, children, refresh: 0, active: true }]);
    } else {
      const menuData = routeContextRef.current?.menuData || [];
      const homePath = menuData.filter((el) => el.path === home);
      setTagList([
        {
          title: homePath[0].name,
          path: home,
          children,
          refresh: 0,
          active: true,
        },
      ]);
    }
  };

  // 关闭标签
  const handleClosePage = (tag: TagsItemType) => {
    // 如果剩余一个标签则关闭所有
    if (tagList.length <= 1) return handleCloseAll();
    const tagsList = tagList.map((el) => ({ ...el }));
    // 判断关闭标签是否处于打开状态
    tagList.forEach((el, i) => {
      if (el.path === tag.path && tag.active) {
        // 关闭当前路由后，跳转到左边，如果左边没路由则跳转到右边
        const next = tagList[i - 1] || tagList[i + 1];
        next.active = true;
        history.push({ pathname: next.path, query: next.query });
      }
    });
    setTagList(tagsList.filter((el) => el.path !== tag.path));
  };

  // 关闭其他标签
  const handleCloseOther = () => {
    const tagsList = tagList.filter((el) => el.active);
    const { path: pathname, query } = tagsList[0];
    history.push({ pathname, query });
    setTagList(tagsList);
  };

  // 刷新选择的标签
  const handleRefreshPage = (tag: TagsItemType) => {
    const { path: pathname, query } = tag;
    const tagsList = tagList.map((item) => {
      if (item.path === tag.path) {
        history.push({ pathname, query });
        return {
          ...item,
          refresh: item.refresh + 1,
          active: true,
          children: <div className="animate__animated animate__fadeIn">{children}</div>,
        };
      }
      return { ...item, title: item.title, active: false };
    });
    setTagList(tagsList);
  };

  useEffect(() => {
    if (routeContextRef.current) handleOnChange(routeContextRef.current);
  }, [routeContextRef.current]);

  return (
    <>
      <TabsMenu
        tagList={tagList}
        closePage={handleClosePage}
        closeAllPage={handleCloseAll}
        closeOtherPage={handleCloseOther}
        refreshPage={handleRefreshPage}
        activeKey={pathKey}
      />
      <RouteContext.Consumer>
        {(value: RouteContextType) => {
          setTimeout(() => {
            setCurrentPath(value.currentMenu?.path); //手动set更新渲染
          }, 0);
          routeContextRef.current = value;
          return null;
        }}
      </RouteContext.Consumer>
    </>
  );
};

export default TagView;

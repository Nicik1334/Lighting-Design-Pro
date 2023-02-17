import React, { useState, useEffect, useRef } from 'react';
import { RouteContext } from '@ant-design/pro-layout';
import type { RouteContextType } from '@ant-design/pro-layout';
import { history } from 'umi';
import TabsMenu from './TabsMenu';

export type TagsItemType = {
  title?: string;
  icon?: string | any;
  path?: string;
  active: boolean;
  query?: any;
  children?: React.ReactNode;
  refresh: number;
};

interface IProps {
  home: string;
}

/**
 * @component TagView 标签页组件
 */
const TagView: React.FC<IProps> = ({ children, home }) => {
  const [tagList, setTagList] = useState<TagsItemType[]>([]);
  const [_, setCurrentPath] = useState<any>();
  const [pathKey, setPathKey] = useState<any>('');
  const routeContextRef = useRef<RouteContextType>();

  // 初始化 visitedViews
  const initTags = (routeContext: RouteContextType) => {
    const {
      menuData = [],
      currentMenu,
      location: { query },
    } = routeContext;

    const HomeTag = menuData.filter((el) => el.path === home)[0]; //如果当前没有路由则跳转到首页
    const path = currentMenu?.path;
    console.log(currentMenu);

    if (path === '/') {
      // 如果路由是 "/" 则重定向首页（自定义）
      history.push({ pathname: HomeTag.path, query });
      setPathKey(HomeTag?.path);
      setTagList([
        {
          title: HomeTag.name,
          path: HomeTag.path,
          children,
          refresh: 0,
          active: true,
          icon: currentMenu?.icon,
        },
      ]);
    } else {
      history.push({ pathname: path, query });
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
    }
  };

  // 监听路由改变 routeContext为当前路由信息
  const handleOnChange = (routeContext: RouteContextType) => {
    const { currentMenu } = routeContext;
    if (tagList.length === 0) {
      return initTags(routeContext);
    }

    // 判断是否已打开过该页面
    let hasOpen = false;
    const tagsCopy: TagsItemType[] = tagList.map((item) => {
      if (currentMenu?.path === item.path) {
        hasOpen = true;
        // 刷新浏览器时，重新覆盖当前 path 的 children
        return { ...item, active: true, children };
      } else {
        return { ...item, active: false };
      }
    });

    // 没有该tag时追加一个,并打开这个tag页面,刷新页面后 tagList为[]（已被上面拦截）、跳转新路由 都会被触发
    if (!hasOpen) {
      const path = currentMenu?.path;
      // console.log(routeContext);
      const {
        location: { query },
      } = routeContext;
      history.push({ pathname: path, query });
      tagsCopy.push({
        title: routeContext.title || '',
        path,
        children,
        refresh: 0,
        active: true,
        icon: currentMenu?.icon,
      });
    }
    setPathKey(currentMenu?.path);
    setTagList(tagsCopy);
  };

  // 关闭所有标签
  const handleCloseAll = () => {
    history.push(home);
    const tagsCopy: TagsItemType[] = tagList.filter((el) => el.path === home);
    if (tagsCopy.length !== 0) {
      //表示路由栏有首页标签
      setTagList([{ ...tagsCopy[0], children, refresh: 0, active: true }]);
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
  const handleCloseTag = (tag: TagsItemType) => {
    if (tagList.length <= 1) {
      return handleCloseAll();
    }
    const tagsCopy: TagsItemType[] = tagList.map((el) => ({ ...el }));
    // 判断关闭标签是否处于打开状态
    tagList.forEach((el, i) => {
      if (el.path === tag.path && tag.active) {
        const next = tagList[i - 1];
        next.active = true;
        history.push({ pathname: next?.path, query: next?.query });
      }
    });
    setTagList(tagsCopy.filter((el) => el.path !== tag?.path));
  };

  // 关闭其他标签
  const handleCloseOther = (tag: TagsItemType) => {
    const tagsCopy: TagsItemType[] = tagList.filter((el) => el.path === tag.path);
    history.push({ pathname: tag?.path, query: tag?.query });
    setTagList(tagsCopy);
  };

  // 刷新选择的标签
  const handleRefreshTag = (tag: TagsItemType) => {
    const tagsCopy: TagsItemType[] = tagList.map((item) => {
      if (item.path === tag.path) {
        history.push({ pathname: tag?.path, query: tag?.query });
        return { ...item, refresh: item.refresh + 1, active: true, children };
      }
      return { ...item, active: false };
    });
    setTagList(tagsCopy);
  };

  useEffect(() => {
    if (routeContextRef.current) {
      handleOnChange(routeContextRef.current);
    }
  }, [routeContextRef.current]);

  return (
    <>
      <TabsMenu
        tagList={tagList}
        closeTag={handleCloseTag}
        closeAllTag={handleCloseAll}
        closeOtherTag={handleCloseOther}
        refreshTag={handleRefreshTag}
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

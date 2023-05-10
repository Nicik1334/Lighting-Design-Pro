/* eslint-disable @typescript-eslint/no-shadow */
import RightContent from '@/components/system/RightContent';
import BaseTabs from '@/layouts/BaseTabs';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { MenuDataItem, ProLayoutProps } from '@ant-design/pro-components';
import { ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Link, history, useModel, Redirect } from 'umi';
import GlobalConfig from '@/global';
import { HOME_PATH, LOGIN_PATH, TABS_LIST, USER_TOKEN } from '@/constants';
import { IconFont } from '@/components/system/IconModal';
import NProgress from '@/components/common/NProgress';
import type { TagsItemType } from '../BaseTabs/TabsMenu/data';

export const isDev = process.env.NODE_ENV === 'development';
const links = isDev
  ? [
      <a key="api" target="_blank">
        <LinkOutlined />
        <span>swagger文档</span>
      </a>,
      <a
        href="https://llq0802.github.io/lighting-design/"
        target="_blank"
        key="docs"
        rel="noreferrer"
      >
        <BookOutlined />
        <span>业务组件文档</span>
      </a>,
    ]
  : [];

const animateProps = {
  className: 'animate__animated animate__fadeInRight',
  style: {
    display: 'inline-block',
    animationDelay: '.2s',
    animationDuration: '.6s',
    animationDirection: 'revert-layer',
  },
};

const ItemChildren = ({
  itemProps,
  defaultDom,
}: {
  itemProps: MenuDataItem;
  defaultDom: React.ReactNode;
}) => {
  if (!itemProps) return null;
  return itemProps.isUrl ? (
    <a href={itemProps.path} target="_blank" rel="noreferrer">
      {defaultDom}
    </a>
  ) : (
    <a
      onClick={() => {
        if (location.pathname === itemProps.path) return;
        const tabItem = (
          JSON.parse(sessionStorage.getItem(TABS_LIST) || '[]') as TagsItemType[]
        ).find((o) => o.path === itemProps.path);
        if (tabItem) {
          const { hash, search } = tabItem.location as Location;
          history.push(`${itemProps.path}${search}${hash}`);
        } else {
          history.push(itemProps.path || '/');
        }
      }}
    >
      {defaultDom}
    </a>
  );
};

const BasicLayout: React.FC<ProLayoutProps> = (props) => {
  const { children, route } = props;
  const { initialState, setInitialState } = useModel('@@initialState');

  // 路径为"/",则重定向到首页
  if (window.location.pathname === '/') return <Redirect to={HOME_PATH} />;

  const loopMenuItem = (menus: MenuDataItem[] = []): MenuDataItem[] | [] =>
    menus.map(({ icon, ...item }) => {
      return {
        ...item,
        icon:
          icon && typeof icon === 'string' && icon.includes('icon') ? (
            <IconFont type={icon} />
          ) : (
            icon
          ),
        children: item.children && loopMenuItem(item.children),
      };
    });

  return (
    <ProLayout
      {...props}
      route={{ routes: loopMenuItem(route?.routes as MenuDataItem[]) }}
      title={GlobalConfig.AppName}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(itemProps, defaultDom) => (
        <>
          {!itemProps.catalogue && itemProps.icon}
          <span />
          <ItemChildren itemProps={itemProps} defaultDom={defaultDom} />
        </>
      )}
      breadcrumbRender={(routers = []) => {
        if (routers.length === 1 && routers[0].path === HOME_PATH) return [...routers];
        return [
          {
            path: HOME_PATH,
            breadcrumbName: '首页',
          },
          ...routers,
        ];
      }}
      onPageChange={() => {
        NProgress.start();
        if (
          history.location.pathname !== LOGIN_PATH &&
          (!sessionStorage.getItem(USER_TOKEN) || !initialState?.currentUser)
        ) {
          history.replace(LOGIN_PATH); // 如果没有登录，重定向到 login
        }
        setTimeout(() => NProgress.done(), 300);
      }}
      rightContentRender={() => <RightContent />}
      links={links}
      itemRender={(route, _, routes) => {
        return routes.indexOf(route) === 0 ? (
          <Link to={HOME_PATH} {...animateProps}>
            首页
          </Link>
        ) : (
          <span {...animateProps}>{route.breadcrumbName}</span>
        );
      }}
      {...initialState?.settings}
    >
      <ConfigProvider>
        {initialState?.settings?.tabView ? (
          <BaseTabs home={HOME_PATH}>{children}</BaseTabs>
        ) : (
          <div>{children}</div>
        )}
        {!props.location?.pathname?.includes('/login') && (
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        )}
      </ConfigProvider>
    </ProLayout>
  );
};

export default BasicLayout;

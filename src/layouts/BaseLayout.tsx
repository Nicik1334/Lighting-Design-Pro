/* eslint-disable react/no-children-prop */
import RightContent from '@/components/RightContent';
import TabsView from '@/components/TabsView';
import { LOGIN_PATH } from '@/constants';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { BasicLayoutProps } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import ProLayout from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Link, history, useModel, Redirect } from 'umi';

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

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;
  const { initialState, setInitialState } = useModel('@@initialState');

  // 路径为"/",则重定向到首页
  if (window.location.pathname === '/') return <Redirect to="/dashboard" />;

  return (
    <ProLayout
      {...props}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom: React.ReactNode | any) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path} children={defaultDom} />;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/home',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      onPageChange={() => {
        if (!initialState?.currentUser && history.location.pathname !== LOGIN_PATH) {
          history.replace(LOGIN_PATH); // 如果没有登录，重定向到 login
        }
      }}
      rightContentRender={() => <RightContent />}
      links={links}
      // itemRender={(route) => <>{route.breadcrumbName}</>}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={'/dashboard'}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      disableContentMargin={false}
      {...initialState?.settings}
    >
      <ConfigProvider>
        <TabsView home="/dashboard">{children}</TabsView>
        {!props.location?.pathname?.includes('/login') && (
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings: any) => {
              setInitialState((preInitialState: any) => ({
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

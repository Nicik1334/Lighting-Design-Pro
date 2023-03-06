import RightContent from '@/components/system/RightContent';
import TabsView from '@/components/common/TabsView';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { ProLayoutProps } from '@ant-design/pro-components';
import { ProLayout, SettingDrawer } from '@ant-design/pro-components';
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

const BasicLayout: React.FC<ProLayoutProps> = (props) => {
  const { children } = props;
  const { initialState, setInitialState } = useModel('@@initialState');

  // 路径为"/",则重定向到首页
  if (window.location.pathname === '/') return <Redirect to="/dashboard" />;

  return (
    <ProLayout
      {...props}
      title="Lighting Admin"
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom: React.ReactNode | any) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/dashboard',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      onPageChange={() => {
        // if (!initialState?.currentUser && history.location.pathname !== LOGIN_PATH) {
        //   history.replace(LOGIN_PATH); // 如果没有登录，重定向到 login
        // }
      }}
      rightContentRender={() => <RightContent />}
      links={links}
      itemRender={(route, _, routes) => {
        return routes.indexOf(route) === 0 ? (
          <Link to={'/dashboard'}>首页</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      {...initialState?.settings}
    >
      <ConfigProvider>
        <TabsView home="/dashboard">{children}</TabsView>
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

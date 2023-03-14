import RightContent from '@/components/system/RightContent';
import TabsView from '@/components/common/TabsView';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { MenuDataItem, ProLayoutProps } from '@ant-design/pro-components';
import { ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import React, { useCallback } from 'react';
import { Link, history, useModel, Redirect } from 'umi';
import GlobalConfig from '@/global';
import { HOME_PAGE } from '@/constants';
import { IconFont } from '@/components/system/IconModal';

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
  if (window.location.pathname === '/') return <Redirect to={HOME_PAGE} />;

  const ItemChildren = useCallback((itemProps, defaultDom) => {
    if (!itemProps) return null;
    if (itemProps.isUrl || !itemProps.path || location.pathname === itemProps.path)
      return <a>{defaultDom}</a>;
    return <Link to={itemProps.path}>{defaultDom}</Link>;
  }, []);

  const IconChildren = (itemProps: MenuDataItem) => {
    if (!itemProps) return null;
    if (typeof itemProps.icon === 'object') {
      if (itemProps.path === HOME_PAGE) return null;
      return (
        <>
          {itemProps.icon}
          <span style={{ width: 10 }} />
        </>
      );
    }
    if (typeof itemProps.icon === 'string' && itemProps.icon.includes('icon'))
      return (
        <>
          <IconFont type={itemProps.icon} />
          <span style={{ width: 10 }} />
        </>
      );
    return null;
  };
  return (
    <ProLayout
      {...props}
      title={GlobalConfig.AppName}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(itemProps, defaultDom: React.ReactNode | any) => {
        return (
          <>
            {IconChildren(itemProps)}
            {ItemChildren(itemProps, defaultDom)}
          </>
        );
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: HOME_PAGE,
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
          <Link to={HOME_PAGE}>首页</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      {...initialState?.settings}
    >
      <ConfigProvider>
        <TabsView home={HOME_PAGE}>{children}</TabsView>
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

/* eslint-disable react/no-children-prop */
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  //获取用户信息，则跳转登录页面
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // console.log('initialState', initialState);
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
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
      : [],
    menuHeaderRender: false,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    childrenRender: (
      children: React.ReactNode,
      props: { location: { pathname: string | string[] } },
    ) => {
      return (
        // if (initialState?.loading) return <PageLoading />;
        <>
          {initialState?.currentUser && location.pathname !== loginPath ? (
            <>
              <ConfigProvider>
                {children}
                {/* <TabsView children={<>{children}</>} home="/welcome" /> */}
              </ConfigProvider>
              {/* {!props.location?.pathname?.includes('/login') && (
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
              )} */}
            </>
          ) : (
            <>{children}</>
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

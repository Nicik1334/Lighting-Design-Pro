import { LoadingOutlined, setTwoToneColor } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-layout';
import { Spin } from 'antd';
import { history } from 'umi';
import type { SettingsTypes } from '../config/defaultSettings';
import defaultSettings from '../config/defaultSettings';
import type { ThemeType } from './components/system/HeaderDark';
import { LOGIN_PATH, THEME_DARK } from './constants';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { AUTHURL, ROUTES } from '../mock/mock';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

//刷新token,获取用户信息，则跳转登录页面
const fetchUserInfo = async () => {
  try {
    const msg = await queryCurrentUser();
    console.log(msg);

    return { ...msg.data, authButton: new Set([]), authUrl: new Set(AUTHURL), routes: ROUTES };
  } catch (error) {
    history.push(LOGIN_PATH);
  }
  return undefined;
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings & SettingsTypes>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // 如果不是登录页面，执行
  if (history.location.pathname !== LOGIN_PATH) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {
        ...defaultSettings,
        navTheme: sessionStorage.getItem(THEME_DARK) || ('light' as ThemeType),
      } as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

Spin.setDefaultIndicator(<LoadingOutlined spin />); // 设置全局loading样式
setTwoToneColor(defaultSettings.primaryColor as string); // 设置全局twoTone图标颜色

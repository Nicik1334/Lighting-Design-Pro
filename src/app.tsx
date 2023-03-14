import { LoadingOutlined, setTwoToneColor } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-layout';
import { Spin } from 'antd';
import { history } from 'umi';
import type { SettingsTypes } from '../config/defaultSettings';
import defaultSettings from '../config/defaultSettings';
import { LOGIN_PATH } from './constants';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

//刷新token,获取用户信息，则跳转登录页面
const fetchUserInfo = async () => {
  try {
    const msg = await queryCurrentUser();
    return msg.data;
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
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

Spin.setDefaultIndicator(<LoadingOutlined spin />);
setTwoToneColor(defaultSettings.primaryColor as string);

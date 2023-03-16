// --no ignore
import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '@/assets/icons/logo.svg';
import GlobalConfig from '@/global';

export interface SettingsTypes {
  pwa?: boolean;
  logo?: string;
  /**
   * 展示tab栏
   */
  tabView: boolean;
  /**
   * 展示路由Tab图标
   */
  tabIcon: boolean;
}
/**
 * @name
 */
const Settings: ProLayoutProps & SettingsTypes = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: true,
  title: GlobalConfig.AppName,
  pwa: false,
  logo,
  tabIcon: true,
  tabView: true,
};

export default Settings;

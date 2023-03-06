// --no ignore
import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '@/assets/icons/logo.svg';
import GlobalConfig from '@/global';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: GlobalConfig.AppName,
  pwa: false,
  logo,
};

export default Settings;

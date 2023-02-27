import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '@/assets/icons/logo.svg';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // colorPrimary: '#1890ff',
  colorPrimary: '#21D2C5',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Lighting Admin',
  pwa: false,
  logo,
  iconfontUrl: '',
};

export default Settings;

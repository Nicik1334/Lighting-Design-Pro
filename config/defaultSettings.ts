// --no ignore
import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '@/assets/icons/logo.svg';

// colorPrimary: '#1890ff',
// primaryColor: '#21D2C5',
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Lighting Admin',
  pwa: false,
  logo,
  iconfontUrl: '',
};

export default Settings;

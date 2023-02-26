import { Settings as LayoutSettings } from '@ant-design/pro-components';
import logo from '@/assets/icons/logo.svg';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // primaryColor: '#1890ff',
  primaryColor: '#21D2C5',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Lighting Design Pro',
  pwa: false,
  logo,
  iconfontUrl: '',
};

export default Settings;

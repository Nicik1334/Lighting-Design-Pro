import GlobalConfig from '../src/global';
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
const isDev = process.env.NODE_ENV === 'development' ? {} : false;
export default defineConfig({
  title: GlobalConfig.AppName,
  hash: true,
  antd: {
    dark: GlobalConfig.IsDark, // 开启暗色主题
  },
  dva: {
    hmr: true,
  },
  base: GlobalConfig.Context,
  publicPath: GlobalConfig.Context,
  dynamicImport: {
    loading: '@/components/system/PageLoading',
  },
  targets: {
    ie: 11,
  },
  routes,
  access: {},
  theme: {
    'root-entry-name': 'variable',
    'border-radius-base': '6px',
    'border-radius': '6px',
  },
  esbuild: {},
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少尺寸。
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  define: { 'process.env.AppName': GlobalConfig.AppName },
  // fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  hardSource: false,
  mfsu: isDev,
  webpack5: isDev,
  exportStatic: {},
});

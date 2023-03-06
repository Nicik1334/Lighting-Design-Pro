import type { Context, RequestMethod } from 'umi-request';
import { extend } from 'umi-request';
import _throttle from 'lodash/throttle';
import NProgress from '@/components/NProgress';
import qs from 'qs';
import { message } from 'antd';
import { showNotification } from '@/utils';
import { CODE_MESSAGE, USER_TOKEN } from '@/constants';
import { getDvaApp } from 'umi';

// 异常退出
const logout = _throttle(
  () => {
    message.error('登录已失效、请重新登录。');
    getDvaApp()._store.dispatch({ type: 'authModel/logout' });
  },
  1000,
  { leading: true, trailing: false },
);

// 配置request请求时的默认参数
const httpHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

// 请求实例
const http: RequestMethod = extend({
  headers: httpHeaders,
});

// 请求拦截
http.use(async (ctx: Context, next: () => void) => {
  NProgress.start();
  const {
    req: {
      options: { headers },
      url,
    },
  } = ctx;
  ctx.req.options.headers = {
    ...headers,
    ticket: sessionStorage.getItem(USER_TOKEN) as string,
  };
  ctx.req.url = ctx.req.url = url.startsWith('/mock') || url.startsWith('/xxx') ? url : `${url}`;
  // ctx.req.url = `${GlobalConfig.Api}${url}`; // '/kg10000/xxx/xxx'
  next();
});

// 响应拦截
http.interceptors.response.use(async (res: any) => {
  NProgress.done();
  const { status } = res;
  if (status === 401) {
    logout();
    return { success: false };
  }
  if (status !== 200) {
    const errorText = CODE_MESSAGE[status] || res.statusText;
    showNotification('error', `请求错误 ${status}`, errorText);
    return { success: false };
  }
  let result;
  try {
    result = await res.clone().json();
    if (!result.success) {
      // message.error(result.msg || '系统错误');
    }
  } catch (error) {
    console.warn(error);
    // message.error('网络异常');
  } finally {
    return res;
  }
});

/**
 * get请求
 * @param url
 * @param data
 * @param params
 * @returns
 */
function post(url: string, data?: any, params?: any) {
  const newUrl = params ? `${url}?${qs.stringify(params)}` : url;
  return http(newUrl, {
    data,
    method: 'POST',
  });
}
/**
 * post请求
 * @param url
 * @param params
 * @returns
 */
function get(url: string, params?: any) {
  return http(url, { params });
}

export { http, post, get };

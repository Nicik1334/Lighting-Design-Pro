import moment from 'moment';
import { parse, stringify } from 'qs';
import { notification, Modal } from 'antd';
import _throttle from 'lodash/throttle';
import _empty from 'lodash/isEmpty';
import { history } from 'umi';
import { NOTIFICATION_TYPES } from '@/constants';

const { confirm } = Modal;
/**
 * 全局通知提醒框
 * @param {String} title
 * @param {String} des
 * @param {String} type
 */
const showNotification = _throttle(
  (
    type: 'success' | 'info' | 'warning' | 'error',
    title = NOTIFICATION_TYPES[type],
    des = '...',
    duration = 2,
  ) => {
    notification[type]({
      message: title,
      description: des,
      className: `ccs-model-${type}`,
      duration,
    });
  },
  1000,
  { leading: true, trailing: false },
);

/**
 * string to HEX
 * @param {*} str
 */
function stringToHex(str: string) {
  if (str === '') return '';
  const hexCharCode = [];
  for (let i = 0; i < str.length; i += 1) {
    hexCharCode.push(str.charCodeAt(i).toString(16));
  }
  return hexCharCode.join('').toUpperCase();
}

// 确认提示框
const showConfirm = (title: string, content: string = '') =>
  new Promise((resolve) => {
    confirm({
      title,
      content,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });

/**
 * 空判断
 * @param val
 * @returns
 */
const isEmpty = (val: unknown) => _empty(val);

/**
 * 有值判断
 * @param val
 * @returns
 */
const isHasData = (val: unknown) => val !== '' && val !== null && val !== undefined;

/**
 * 非空
 * @param val
 * @returns
 */
const isNotEmpty = (val: unknown) => !isEmpty(val);

// eslint-disable-next-line no-confusing-arrow
const fixedZero = (val: number) => (val * 1 < 10 ? `0${val}` : val);

function onToString(e: any) {
  if (!e) return '';
  return e.toString();
}

const getTimeDistance = (type: 'today' | 'week' | 'month') => {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }
    const beginTime = now.getTime() - day * oneDay;
    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
};

const getPageQuery = () => parse(window.location.href.split('?')[1]);

const getQueryPath = (path = '', query = {}) => {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
};

/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string) => reg.test(path);

const urlToList = (url: string) => {
  const urllist = url.split('/').filter((i) => i);
  return urllist.map(
    (urlItem: string, index: number) => `/${urllist.slice(0, index + 1).join('/')}`,
  );
};

/**
 * 格式化字符串
 * @param str
 * @returns
 */
export const formatJsonText = (str: any) => {
  if (!str) {
    return str;
  }
  let jsontxt = '';
  try {
    jsontxt =
      typeof str === 'string'
        ? JSON.stringify(JSON.parse(str), null, ' ')
        : JSON.stringify(str, null, ' ');
  } catch (e) {
    jsontxt = str;
  }

  return jsontxt;
};

const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

const isBrowser = () => {
  if (process.env.NODE_ENV === 'TEST') {
    return true;
  }
  return typeof window !== 'undefined' && typeof window.document !== 'undefined' && !isNode;
};

/**
 * 自定义监听事件
 * @param el
 * @param eventName
 */
const dispatchEvent = (
  el: HTMLElement | undefined | null | Document,
  eventName:
    | 'FormListReload'
    | 'DragEndCancel'
    | 'DragGridEndCancel'
    | 'FormModelReload'
    | 'RefleshLog',
) => {
  if (el) {
    const ev = new CustomEvent(eventName, {
      bubbles: false,
      cancelable: false,
    });
    el.dispatchEvent(ev);
  }
};

const add0 = (m: number) => {
  return m < 10 ? `0${m}` : m;
};

function formatDate(times: string) {
  const date = Number(times);
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();

  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
}

/**
 * 时间string to moment
 * @param val
 * @returns
 */
const momentDate: any = (val: string | undefined) => {
  if (!val) return undefined;
  return moment(val);
};

/**
 * 格式化时间
 * @param val
 * @param type  'date' | 'datetime'
 * @returns
 */
function formartDate(val: any, type: 'date' | 'datetime' = 'datetime') {
  return val.format(type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss');
}

/**
 * file类型转base地址
 * @param {File} file
 * @returns
 */
const getImgBase64Url = (file: File) => {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = async (e) => {
      const base64 = e?.target?.result;
      resolve(base64);
    };
  });
};

/**
 * 自定义hook 用于获取当前路由locusPage信息,与机房信息
 * @param pathname 当前路由pathname
 * @returns
 */

function usechangeLocation(pathname: string, callBack: (location: any) => void) {
  const unlisten = history.listen(async (location) => {
    // 指定路由
    if (location.pathname === pathname) {
      callBack(location);
    }
  });
  return unlisten;
}

/**
 *  模拟请求
 * @param time
 * @param data
 * @returns
 */

function awaitTime(
  data?: any,
  time = 2000,
): Promise<{
  data?: any;
  success: boolean;
  code: string;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, success: true, code: '200' });
    }, time);
  });
}

export {
  isUrl,
  isEmpty,
  isHasData,
  isBrowser,
  urlToList,
  fixedZero,
  isNotEmpty,
  onToString,
  momentDate,
  showConfirm,
  stringToHex,
  formartDate,
  getPageQuery,
  getQueryPath,
  dispatchEvent,
  getTimeDistance,
  showNotification,
  formatDate,
  getImgBase64Url,
  usechangeLocation,
  awaitTime,
};

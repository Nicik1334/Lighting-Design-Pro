import { history } from 'umi';
import { stringify } from 'qs';
import type { Reducer } from 'redux';
import type { Effect } from 'umi';
import { HOME_PATH, LOGIN_PATH, NOT_PATH, USER_TOKEN } from '@/constants';
import { outLogin } from '@/services/ant-design-pro/api';

export interface AuthModelState {}

interface AuthModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    logout: Effect;
  };
  reducers: {
    save: Reducer<AuthModelState>;
  };
}

const LoginModel: AuthModelType = {
  namespace: 'authModel',
  state: {},
  effects: {
    // 退出登录
    *logout({ payload }, { put, call }) {
      let redirect = window.location.pathname;
      const { hash } = window.location;
      if (hash && hash.startsWith('#')) redirect = hash.replace('#', '');
      if (
        !window.location.hash.includes(LOGIN_PATH) &&
        !window.location.pathname.includes(LOGIN_PATH)
      ) {
        history.replace({
          pathname: LOGIN_PATH,
          search: stringify({ redirect: redirect === NOT_PATH ? HOME_PATH : redirect }),
        });
        const response = yield call(outLogin, payload);
        if (response.success) sessionStorage.removeItem(USER_TOKEN);
        return response;
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default LoginModel;

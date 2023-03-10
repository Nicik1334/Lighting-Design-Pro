import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Checkbox, Col, Form, message, Row, Space, Tabs } from 'antd';
import {
  LForm,
  LFormItemCaptcha,
  LFormItemInput,
  LFormItemPassword,
  LLoginForm,
} from 'lighting-design';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import React from 'react';
import style from './style.less';
import loginBg from '@/assets/imgs/login/loginBg.png';
import loginBoxBg from '@/assets/imgs/login/loginBoxBg.png';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { useModel, history } from 'umi';
import logo from '@/assets/icons/logo1.svg';
import { useRequest } from 'ahooks';
import { login } from '@/services/ant-design-pro/api';
import { getPageQuery } from '@/utils';
import { USER_TOKEN } from '@/constants';

const iconStyles: CSSProperties = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

interface LoginProps {}
const Login: React.FC<LoginProps> = () => {
  const [type, setType] = useState<string>('account');
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const { loading, run: loginRun } = useRequest(login, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        const { data: d } = result as HttpResult;
        sessionStorage.setItem(USER_TOKEN, d.token);
        const params = getPageQuery();
        const { redirect = '/' } = params as { redirect: string };
        history.push(redirect);
        setUserLoginState({
          success: result.success,
          type: d.type,
        });
        fetchUserInfo();
      }
    },
  });

  const { success, type: loginType } = userLoginState;

  // ??????????????????
  const AccountDom = () => (
    <LForm
      name="LFormItemInput"
      submitter={{
        showReset: false,
        submitButtonProps: {
          block: true,
        },
        submitText: '??????',
      }}
      loading={loading}
      onFinish={async (values) => {
        loginRun({ ...values, type: 'account', autoLogin: true } as API.LoginParams);
      }}
    >
      <LFormItemInput
        name="username"
        required
        disabledWhiteSpace
        placeholder="??????????????????"
        initialValue="admin"
        inputProps={{
          prefix: <UserOutlined />,
          placeholder: 'admin',
        }}
      />
      <LFormItemPassword
        name="password"
        required
        initialValue="ant.design"
        passwordProps={{
          prefix: <LockOutlined />,
          placeholder: 'ant.design',
        }}
      />
    </LForm>
  );

  // ???????????????
  const PhoneDom = () => (
    <LForm
      name="LFormItemInput"
      submitter={{
        showReset: false,
        submitButtonProps: {
          block: true,
        },
        submitText: '??????',
      }}
      form={form}
      loading={loading}
      onFinish={(values) => {
        loginRun({ ...values, type });
      }}
    >
      <LFormItemInput
        name="phone"
        required
        type="phone"
        disabledWhiteSpace
        placeholder="??????????????????"
        rules={[
          {
            required: true,
            message: '?????????????????????!',
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            min: 11,
          },
        ]}
      />
      <LFormItemCaptcha
        type="inline"
        name="captcha"
        required
        second={60}
        onGetCaptcha={async () => {
          await form.validateFields(['phone']);
          const phone = form.getFieldValue('phone');
          return await getFakeCaptcha({
            phone,
          }).then(() => {
            message.success('???????????????????????????????????????1234');
          });
        }}
        placeholder="??????????????????"
        cacheKey="LOGIN_FROM"
      />
    </LForm>
  );
  return (
    <Row
      className={style.container}
      style={{
        background: `url(${loginBg}) no-repeat`,
      }}
    >
      <Col flex="1" className={style.login_col}>
        <div className={style.login_intro}>
          <h1>Lighting Admin</h1>
          <div className={style.desc}>
            ??????React???TypeScript???Ant Design???UmiJs???ahook????????????????????????????????? lighting-design
            Pro ????????? Ant Design UI
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? CRUD
            ????????????????????????????????????????????????
          </div>
          <div className={style.login_bg}>
            <img src={loginBoxBg} alt="" />
          </div>
        </div>
      </Col>
      <Col style={{ minWidth: '36%' }} className={style.login_from_col}>
        <LLoginForm
          message={
            !success &&
            ((loginType === 'account' && (
              <Alert message="???????????????????????????" showIcon closable type="error" />
            )) ||
              (loginType === 'mobile' && (
                <Alert message="??????????????????" showIcon closable type="error" />
              )))
          }
          logo={logo}
          title="Lighting Admin"
          subTitle="Lighting Admin?????????Ant Design???????????????????????????????????????"
          actions={
            <Space>
              ??????????????????
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
          style={{ background: '#fff' }}
        >
          <Tabs
            centered
            onChange={(e) => setType(e)}
            items={[
              {
                label: '??????????????????',
                key: 'account',
                children: <AccountDom />,
              },
              {
                label: '???????????????',
                key: 'mobile',
                children: <PhoneDom />,
              },
            ]}
          />
          <div style={{ margin: '12px 0 24px' }}>
            <Checkbox defaultChecked>????????????</Checkbox>
            <a style={{ float: 'right' }}>????????????</a>
          </div>
        </LLoginForm>
      </Col>
    </Row>
  );
};

export default Login;

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

  // 账号密码登录
  const AccountDom = () => (
    <LForm
      name="LFormItemInput"
      submitter={{
        showReset: false,
        submitButtonProps: {
          block: true,
        },
        submitText: '登录',
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
        placeholder="请输入用户名"
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

  // 手机号登录
  const PhoneDom = () => (
    <LForm
      name="LFormItemInput"
      submitter={{
        showReset: false,
        submitButtonProps: {
          block: true,
        },
        submitText: '登录',
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
        placeholder="请输入手机号"
        rules={[
          {
            required: true,
            message: '手机号格式错误!',
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
            message.success('获取验证码成功！验证码为：1234');
          });
        }}
        placeholder="请输入验证码"
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
            基于React、TypeScript、Ant Design、UmiJs、ahook等开发的后台模板组件。 lighting-design
            Pro 是基于 Ant Design UI
            而开发的业务常用模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD
            页面的效率，更加专注于页面开发。
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
              <Alert message="登录异常，请重试！" showIcon closable type="error" />
            )) ||
              (loginType === 'mobile' && (
                <Alert message="验证码错误！" showIcon closable type="error" />
              )))
          }
          logo={logo}
          title="Lighting Admin"
          subTitle="Lighting Admin是基于Ant Design而开发的业务常用模板组件。"
          actions={
            <Space>
              其他登录方式
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
                label: '账号密码登录',
                key: 'account',
                children: <AccountDom />,
              },
              {
                label: '手机号登录',
                key: 'mobile',
                children: <PhoneDom />,
              },
            ]}
          />
          <div style={{ margin: '12px 0 24px' }}>
            <Checkbox defaultChecked>记住密码</Checkbox>
            <a style={{ float: 'right' }}>忘记密码</a>
          </div>
        </LLoginForm>
      </Col>
    </Row>
  );
};

export default Login;

import { awaitTime } from '@/utils';
import { Form, Input, message, Progress, Tooltip, Typography } from 'antd';
import type { LModalFormProps } from 'lighting-design';
import { LForm, LFormItemInput, LModalForm } from 'lighting-design';
import type { FC } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import {
  level,
  REG_CHINESE,
  REG_LOWERCASE,
  REG_NUMBER,
  REG_SYMBOL,
  REG_UPPERCASE,
  STATUS_TEXT,
} from './utils';

const { Text } = Typography;
interface BasicModalProps extends LModalFormProps {
  onChange: () => void;
  open: boolean;
}

const TextStyle = { marginBottom: 4, display: 'block' };

const Password: FC<BasicModalProps> = ({ onChange, open, ...restProps }) => {
  const { initialState } = useModel('@@initialState');
  if (!initialState) return null;
  const { currentUser } = initialState as any;
  const [form] = LForm.useForm();
  const [steps, setSteps] = useState<number>(0);
  const [validateStatus, setValidateStatus] = useState<'success' | 'warning' | 'error' | ''>('');
  const [verify, setVerify] = useState<boolean[]>([false, false, false]);

  const WordPopover = () => {
    return (
      <div style={{ width: '100%' }}>
        <Text style={TextStyle} type="secondary" strong={!verify[0]} delete={verify[0]}>
          1、请勿包含用户名、空格、中文字符。
        </Text>
        <Text style={TextStyle} type="secondary" strong={!verify[1]} delete={verify[1]}>
          2、密码长度必须大于8位数小于16位数。
        </Text>
        <Text style={TextStyle} type="secondary" strong={!verify[2]} delete={verify[2]}>
          3、数字、小写字母、大写字母、特殊字符，至少包含三种。
        </Text>
        {steps !== 0 && (
          <>
            <Progress
              percent={steps * 20}
              steps={5}
              strokeLinecap="butt"
              showInfo={false}
              strokeColor={['red', 'red', 'orange', 'orange', '#52c41a']}
              style={{ marginRight: 10 }}
            />
            {STATUS_TEXT[steps]}
            <br />
          </>
        )}
      </div>
    );
  };

  const pwdChange = (value: string) => {
    if (value) {
      const key = level(value);
      switch (key) {
        case STATUS_TEXT[1]:
          setValidateStatus('error');
          setSteps(1);
          break;
        case STATUS_TEXT[2]:
          setValidateStatus('error');
          setSteps(2);
          break;
        case STATUS_TEXT[3]:
          setValidateStatus('warning');
          setSteps(3);
          break;
        case STATUS_TEXT[4]:
          setValidateStatus('warning');
          setSteps(4);
          break;
        case STATUS_TEXT[5]:
          setValidateStatus('success');
          setSteps(5);
          break;
      }
    } else {
      setSteps(0);
      setVerify([false, false, false]);
    }
  };

  /**
   * 校验密码是否符合条件
   * @param password 密码
   * @param username 用户名
   */
  const checkPasswordRule = (password: string, username: string) => {
    const newVerify = [...verify];
    if (!password) {
      setValidateStatus('error');
      return '请输入新密码!';
    }

    if (password.indexOf(username) !== -1 || password.match(REG_CHINESE) || /\s/g.test(password)) {
      newVerify[0] = false;
      setVerify(newVerify);
      return '请勿包含用户名、空格、中文字符';
    } else {
      newVerify[0] = true;
    }
    if (password === '' || password.length < 8 || password.length > 16) {
      newVerify[1] = false;
      setVerify(newVerify);
      return '密码长度应大于8位数小于16位数';
    } else {
      newVerify[1] = true;
    }

    let i: number = 0;
    if (password.match(REG_NUMBER)) i++;
    if (password.match(REG_LOWERCASE)) i++;
    if (password.match(REG_UPPERCASE)) i++;
    if (password.match(REG_SYMBOL)) i++;
    if (i < 3) {
      newVerify[2] = false;
      setVerify(newVerify);
      return '数字、小写字母、大写字母、特殊字符，至少包含三种';
    } else {
      newVerify[2] = true;
    }
    setVerify(newVerify);
    return true;
  };

  return (
    <LModalForm
      open={open}
      form={form}
      width={600}
      labelCol={{ span: 5 }}
      title="修改密码"
      onFinish={async (values) => {
        console.log(values);

        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        message.success('修改成功！');
        return true;
      }}
      onValuesChange={(e) => {
        if (e?.newPwd) {
          pwdChange(e.newPwd);
        }
      }}
      {...restProps}
    >
      <LFormItemInput name="oldPwd" label="原密码" required />
      <Tooltip
        placement="topLeft"
        color="#fff"
        trigger="focus"
        align={{ offset: [110, -5] }}
        overlayInnerStyle={{
          width: 400,
          minHeight: 100,
          color: '#000',
          fontSize: 13,
        }}
        getTooltipContainer={(dom) => dom}
        title={<WordPopover />}
      >
        <Form.Item
          name="newPwd"
          label="新密码"
          required
          hasFeedback
          validateStatus={validateStatus}
          tooltip="密码应由8-16位数字、字母、符号组成。请不要使用易被猜的密码。"
          rules={[
            {
              validator: (_, value: string) => {
                const check = checkPasswordRule(value, currentUser?.workerName || '');
                if (typeof check === 'string') {
                  return Promise.reject(new Error(check));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            maxLength={16}
            onChange={(e) => pwdChange(e.target.value)}
            placeholder="请输入新密码"
            allowClear
          />
        </Form.Item>
      </Tooltip>
      <Form.Item
        label="确认密码"
        name="confirm"
        dependencies={['newPwd']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入确认密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPwd') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码输入不一致'));
            },
          }),
        ]}
      >
        <Input.Password
          autoComplete="new-password"
          allowClear
          type="password"
          placeholder="输入确认密码"
        />
      </Form.Item>
    </LModalForm>
  );
};

export default Password;

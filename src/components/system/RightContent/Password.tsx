import { awaitTime } from '@/utils';
import { message } from 'antd';
import type { LModalFormProps } from 'lighting-design';
import { LForm, LFormItemInput, LModalForm } from 'lighting-design';
import type { FC } from 'react';

interface BasicModalProps extends LModalFormProps {
  onChange: () => void;
  open: boolean;
}

const Password: FC<BasicModalProps> = ({ onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  return (
    <LModalForm
      open={open}
      form={form}
      width={500}
      title="修改密码"
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        message.success('修改成功！');
        return true;
      }}
      {...restProps}
    >
      <LFormItemInput name="roleName" label="角色名称" disabled />
      <LFormItemInput name="roleDesc" label="角色描述" disabled />
      <LFormItemInput name="roleDesc" label="角色描述" disabled />
    </LModalForm>
  );
};

export default Password;

import { awaitTime } from '@/utils';
import { Button, Card, message, Space } from 'antd';
import { LDrawerForm, LFormItemSelect } from 'lighting-design';
import { LForm, LFormItemInput } from 'lighting-design';
import React, { useEffect, useState } from 'react';

const BaseModal: React.FC = () => {
  const [form] = LForm.useForm();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  useEffect(() => {
    if (open1) {
      form.setFieldsValue({
        name: '李四',
        email: '1345677892@qq.com',
        phone: '18212345673',
        sex: '1',
        state: '1',
        role: '0',
      });
    }
  }, [form, open1]);
  return (
    <Card>
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>
          新增
        </Button>
        <Button type="primary" onClick={() => setOpen1(true)}>
          编辑
        </Button>
      </Space>

      <LDrawerForm
        form={form}
        labelCol={{ span: 4 }}
        open={open}
        onOpenChange={setOpen}
        title="新增"
        width={500}
        onFinish={async (values) => {
          console.log('onFinish-values ', values);
          await awaitTime();
          message.success('提交成功');
          return true;
        }}
      >
        <LFormItemInput name="name" required label="用户名" />
        <LFormItemInput name="phone" type="phone" required label="手机号" />
        <LFormItemInput name="email" type="email" label="邮箱" />
        <LFormItemSelect
          name="sex"
          label="性别"
          options={[
            {
              label: '男',
              value: '1',
            },
            {
              label: '女',
              value: '2',
            },
          ]}
        />
        <LFormItemSelect
          name="state"
          required
          label="状态"
          options={[
            {
              label: '正常',
              value: '0',
            },
            {
              label: '禁用',
              value: '1',
            },
          ]}
        />
        <LFormItemSelect
          name="role"
          required
          label="角色"
          options={[
            {
              label: '普通用户',
              value: '0',
            },
            {
              label: '财务管理员',
              value: '1',
            },
            {
              label: '推广管理员',
              value: '2',
            },
            {
              label: '超级管理员',
              value: '3',
            },
          ]}
        />
      </LDrawerForm>

      <LDrawerForm
        open={open1}
        onOpenChange={setOpen1}
        labelCol={{ span: 4 }}
        form={form}
        title="编辑"
        onFinish={async (values) => {
          console.log('onFinish-values ', values);
          await awaitTime();
          message.success('提交成功');
          return true;
        }}
      >
        <LFormItemInput name="name" required label="用户名" />
        <LFormItemInput name="phone" type="phone" required label="手机号" />
        <LFormItemInput name="email" type="email" label="邮箱" />
        <LFormItemSelect
          name="sex"
          label="性别"
          options={[
            {
              label: '男',
              value: '1',
            },
            {
              label: '女',
              value: '2',
            },
          ]}
        />
        <LFormItemSelect
          name="state"
          required
          label="状态"
          options={[
            {
              label: '正常',
              value: '0',
            },
            {
              label: '禁用',
              value: '1',
            },
          ]}
        />
        <LFormItemSelect
          name="role"
          required
          label="角色"
          options={[
            {
              label: '普通用户',
              value: '0',
            },
            {
              label: '财务管理员',
              value: '1',
            },
            {
              label: '推广管理员',
              value: '2',
            },
            {
              label: '超级管理员',
              value: '3',
            },
          ]}
        />
      </LDrawerForm>
    </Card>
  );
};

export default BaseModal;

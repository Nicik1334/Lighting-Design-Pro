import { awaitTime } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { Button, message, Modal, Space } from 'antd';
import type { LStepsFormActionRef } from 'lighting-design';
import { LFormItemSelect } from 'lighting-design';
import { LForm, LFormItemInput, LModalForm, LStepsForm } from 'lighting-design';
import React, { useRef, useState, useEffect } from 'react';

const BaseModal: React.FC = () => {
  const [form] = LForm.useForm();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    if (open1) {
      form.setFieldsValue({
        name: '张三',
        email: '1345677892@qq.com',
        phone: '18212345673',
        sex: '1',
        state: '1',
        role: '0',
      });
    }
  }, [form, open1]);
  const actionRef = useRef<LStepsFormActionRef>();
  return (
    <ProCard>
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>
          新增
        </Button>
        <Button type="primary" onClick={() => setOpen1(true)}>
          编辑
        </Button>
        <Button type="primary" onClick={() => setOpen2(true)}>
          分步
        </Button>
      </Space>

      <LModalForm
        open={open}
        onOpenChange={setOpen}
        isDraggable
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        title="新增"
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
      </LModalForm>

      <LModalForm
        isDraggable
        open={open1}
        onOpenChange={setOpen1}
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
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
      </LModalForm>

      <LStepsForm
        actionRef={actionRef}
        onFinish={async (valuse) => {
          await awaitTime();
          console.log('StepsForm-valuse', valuse);
          message.success('提交成功');
        }}
        stepsFormRender={(stepsDom, formDom, submitterDom) => {
          return (
            <Modal
              title="弹窗中的步骤表单"
              open={open2}
              footer={submitterDom}
              width={600}
              onCancel={() => setOpen2(false)}
            >
              {stepsDom}
              {formDom}
            </Modal>
          );
        }}
      >
        <LStepsForm.StepForm title="步骤1">
          <LFormItemInput name={['step1', 'name1']} label="名字1" required tooltip="禁止空格" />
          <LFormItemInput name={['step1', 'name2']} label="名字2" required tooltip="禁止空格" />
        </LStepsForm.StepForm>
        <LStepsForm.StepForm title="步骤2">
          <LFormItemInput
            name={['step2', 'phone']}
            label="手机号"
            required
            tooltip="禁止空格 只能输入数字"
            type="phone"
          />
        </LStepsForm.StepForm>
      </LStepsForm>
    </ProCard>
  );
};

export default BaseModal;

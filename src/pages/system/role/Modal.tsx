import { awaitTime } from '@/utils';
import type { LModalFormProps } from 'lighting-design';
import { LForm, LFormItemInput, LFormItemSelect, LModalForm } from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const BasicModal: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    }
  }, [open, data, form]);

  return (
    <LModalForm
      open={open}
      form={form}
      width={700}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      title={data ? '修改信息' : '新建角色'}
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        return true;
      }}
      {...restProps}
    >
      <LFormItemInput name="roleName" required label="角色名称" />
      <LFormItemInput name="roleDesc" label="角色描述" />
      <LFormItemSelect
        label="状态"
        name="state"
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ]}
      />
    </LModalForm>
  );
};

export default BasicModal;

import { awaitTime } from '@/utils';
import type { LModalFormProps } from 'lighting-design';
import {
  LForm,
  LFormItemInput,
  LFormItemRadio,
  LFormItemTextArea,
  LModalForm,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';

interface ValueModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}
const ValueModal: FC<ValueModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    }
  }, [open, data, form]);

  return (
    <LModalForm
      isDraggable
      isEnterSubmit={false}
      open={open}
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12 }}
      title={data ? '修改' : '新增'}
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        return true;
      }}
      {...restProps}
    >
      <LFormItemInput name="label" required label="字典标签" />
      <LFormItemInput name="value" required label="字典键值" />
      <LFormItemInput type="number" name="sort" required label="排序" />
      <LFormItemRadio
        label="状态"
        name="status"
        initialValue="1"
        options={[
          {
            label: '正常',
            value: 1,
          },
          {
            label: '停用',
            value: 0,
          },
        ]}
      />
      <LFormItemTextArea label="备注" name="remark" />
    </LModalForm>
  );
};

export default ValueModal;

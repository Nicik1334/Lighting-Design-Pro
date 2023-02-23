import { awaitTime } from '@/utils';
import {
  LForm,
  LFormItemCheckbox,
  LFormItemDatePicker,
  LFormItemInput,
  LFormItemRadio,
  LFormItemSelect,
  LModalForm,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';

interface BasicModalProps {
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
      <LFormItemInput name="name" required label="姓名" />
      <LFormItemInput name="phone" required type="phone" label="手机号码" />
      <LFormItemSelect
        label="类型"
        name="type"
        request={async () => {
          const result = await awaitTime([
            {
              label: '舒适性',
              value: '1',
            },
            {
              label: '经济性',
              value: '2',
            },
            {
              label: '无痛性',
              value: '3',
            },
          ]);
          if (result.success) return result.data;
        }}
      />
      <LFormItemSelect
        label="人员类型"
        name="personType"
        required
        options={[
          {
            label: '成人',
            value: '1',
          },
          {
            label: '儿童',
            value: '2',
          },
        ]}
      />
      <LFormItemDatePicker label="预约时间" name="makeDate" picker="date" />
      <LFormItemCheckbox
        label="预约项目"
        required
        name="makeProject"
        options={[
          {
            label: '种牙',
            value: '1',
          },
          {
            label: '补牙',
            value: '2',
          },
          {
            label: '拔牙',
            value: '3',
          },
        ]}
      />
      <LFormItemRadio
        label="来源"
        name="makeSource"
        initialValue="1"
        options={[
          {
            label: '门店',
            value: '1',
          },
          {
            label: '美团',
            value: '2',
          },
          {
            label: '微信',
            value: '3',
          },
        ]}
      />
    </LModalForm>
  );
};

export default BasicModal;

import { userStatusLabels } from '@/constants';
import { awaitTime } from '@/utils';
import { Row, Col } from 'antd';
import {
  LForm,
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
      open={open}
      form={form}
      width={700}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      title={data ? '修改信息' : '新建用户'}
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        return true;
      }}
      {...restProps}
    >
      <Row>
        <Col span={12}>
          <LFormItemInput name="userName" required label="用户名" />
        </Col>
        <Col span={12}>
          <LFormItemInput name="age" required type="number" label="年龄" />
        </Col>
        <Col span={12}>
          <LFormItemInput name="phone" required type="phone" label="手机号码" />
        </Col>
        <Col span={12}>
          <LFormItemRadio
            label="性别"
            name="gender"
            options={[
              {
                label: '男',
                value: '1',
              },
              {
                label: '女',
                value: '0',
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <LFormItemInput name="email" required type="email" label="邮箱" />
        </Col>
        <Col span={12}>
          <LFormItemSelect
            label="状态"
            name="userStatus"
            options={[
              {
                label: '启用',
                value: '1',
              },
              {
                label: '禁用',
                value: '2',
              },
              {
                label: '冻结',
                value: '3',
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <LFormItemInput
            name="address"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            required
            label="地址"
          />
        </Col>
      </Row>
    </LModalForm>
  );
};

export default BasicModal;

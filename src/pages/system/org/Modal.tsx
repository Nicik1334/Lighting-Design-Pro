import TreeSlider from '@/components/common/TreeSlider';
import { awaitTime } from '@/utils';
import { useRequest } from 'ahooks';
import { Row, Col } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import type { LModalFormProps } from 'lighting-design';
import { LFormItem, LFormItemRadio, LFormItemTextArea } from 'lighting-design';
import { LTrigger } from 'lighting-design';
import { LForm, LFormItemInput, LModalForm } from 'lighting-design';
import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getOrgChildren } from '../user/server';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}

const onFormat = (nodes: any[]): DataNode[] => {
  nodes.forEach((res) => {
    res.key = res.orgId;
    res.title = res.orgName;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};
const BasicModal: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();
  const [theeData, setTheeData] = useState<DataNode[]>([]);

  const { loading: loading1 } = useRequest(getOrgChildren, {
    onSuccess: (result) => {
      if (result.success) {
        const { data: d } = result;
        setTheeData(onFormat(d));
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue(data);
    }
  }, [open, data, form]);

  const TriggerTree = (...props: any[]) => {
    return (
      <TreeSlider
        placeholder="筛选部门"
        loading={loading1}
        checkable={false}
        treeList={theeData}
        titleRender={(item: any) => <div>{item.orgName}</div>}
        onSelect={(_, item: any) => {
          props[0].onChange({
            label: item.node.orgName,
            value: item.node.orgId,
          });
          props[0].setOpen(false);
        }}
        selectedKeys={[props[0].value]}
      />
    );
  };

  const ItemTree = (...props: any[]) => {
    return (
      <LTrigger
        {...props[0]}
        allowClear
        disabled={!!data}
        placement="bottomLeft"
        placeholder="请选择上级部门"
      >
        <TriggerTree />
      </LTrigger>
    );
  };

  return (
    <LModalForm
      open={open}
      form={form}
      width={800}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      title={data ? '修改信息' : '新建组织'}
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
          <LFormItem
            name="orgId"
            required
            label="上级部门"
            initialValue={{
              label: '全部公司',
              value: '9998',
            }}
          >
            <ItemTree />
          </LFormItem>
        </Col>
        <Col span={12}>
          <LFormItemInput name="sortId" required type="number" label="序号" />
        </Col>
        <Col span={12}>
          <LFormItemInput name="orgCode" required label="组织编码" />
        </Col>
        <Col span={12}>
          <LFormItemRadio
            label="状态"
            name="state"
            required
            initialValue="1"
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
        <Col span={12}>
          <LFormItemInput name="orgName" required label="组织名称" />
        </Col>
        <Col span={12}>
          <LFormItemTextArea name="orgDesc" required label="组织描述" />
        </Col>
      </Row>
    </LModalForm>
  );
};

export default BasicModal;

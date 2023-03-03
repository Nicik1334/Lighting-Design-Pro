import { awaitTime } from '@/utils';
import { useRequest } from 'ahooks';
import type { DataNode } from 'antd/lib/tree';
import type { LModalFormProps } from 'lighting-design';
import { LForm, LFormItemInput, LFormItem, LDrawerForm } from 'lighting-design';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { getTreeNode } from '../server';
import TreeSlider from './treeSlider';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}

const onFormat = (nodes: any[]): DataNode[] => {
  nodes.forEach((res) => {
    res.key = res.nodeId;
    res.title = res.nodeName;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};

const BasicModal: FC<BasicModalProps> = ({ data, onChange, open, ...restProps }) => {
  const [form] = LForm.useForm();
  const [theeData, setTheeData] = useState<DataNode[]>([]);

  const { run, loading } = useRequest(getTreeNode, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        const { data: d } = result;
        setTheeData(onFormat(d.nodes));
        form.setFieldsValue({
          checkedIds: d.checkedIds,
        });
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      run({});
      form.setFieldsValue(data);
    }
  }, [open, data, form]);

  return (
    <LDrawerForm
      open={open}
      form={form}
      title={data ? '修改信息' : '新建角色'}
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        return true;
      }}
      isEnterSubmit={false}
      {...restProps}
    >
      <LFormItemInput name="roleName" label="角色名称" disabled />
      <LFormItemInput name="roleDesc" label="角色描述" disabled />
      <LFormItem valuePropName="checkedKeys" trigger="onCheck" name="checkedIds" label="菜单列表">
        <TreeSlider loading={loading} treeList={theeData} />
      </LFormItem>
    </LDrawerForm>
  );
};

export default BasicModal;

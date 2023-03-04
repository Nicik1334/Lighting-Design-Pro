import TreeSlider from '@/components/treeSlider';
import { awaitTime } from '@/utils';
import { useRequest } from 'ahooks';
import type { DataNode } from 'antd/lib/tree';
import type { LModalFormProps } from 'lighting-design';
import { LDrawerForm } from 'lighting-design';
import { LFormItem, LFormItemRadio, LFormItemTextArea } from 'lighting-design';
import { LTrigger } from 'lighting-design';
import { LForm, LFormItemInput } from 'lighting-design';
import type { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMenuItem } from '../server';

interface BasicModalProps extends LModalFormProps {
  data: any;
  onChange: () => void;
  open: boolean;
}

const menuLabels = {
  1: '菜单',
  2: '按钮',
  3: '外链',
};

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
  const [menuType, setMenuType] = useState<number>(1);
  const { loading: loading1 } = useRequest(getMenuItem, {
    onSuccess: (result) => {
      if (result.success) {
        const { data: d } = result;
        console.log(d);

        setTheeData(onFormat(d));
      }
    },
  });

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        ...data,
        nodeId: {
          label: data.nodeName,
          value: data.nodeId,
        },
      });
    }
  }, [open, data, form]);

  const ItemTree = (...props: any[]) => {
    return (
      <TreeSlider
        placeholder="筛选菜单"
        loading={loading1}
        checkable={false}
        treeList={theeData}
        titleRender={(item: any) => <div>{item.nodeName}</div>}
        onSelect={(_, item: any) => {
          props[0].onChange({
            label: item.node.nodeName,
            value: item.node.nodeId,
          });
          props[0].setOpen(false);
        }}
        selectedKeys={[props[0].value]}
      />
    );
  };

  const TriggerItem = (...props: any[]) => {
    return (
      <LTrigger
        {...props[0]}
        allowClear
        style={{ width: '100%' }}
        // disabled={!!data}
        placement="bottomLeft"
        placeholder="请选择上级部门"
      >
        <ItemTree />
      </LTrigger>
    );
  };

  return (
    <LDrawerForm
      open={open}
      form={form}
      labelCol={{ span: 4 }}
      title={data ? '修改信息' : '新建组织'}
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        return true;
      }}
      {...restProps}
    >
      <LFormItem
        name="nodeId"
        required
        label="上级菜单"
        tooltip="上级菜单"
        wrapperCol={{ span: 24 }}
      >
        <TriggerItem />
      </LFormItem>
      <LFormItemRadio
        label="菜单类型"
        name="menuType"
        disabled={data}
        required
        initialValue={menuType}
        options={[
          {
            label: '菜单',
            value: 1,
          },
          {
            label: '按钮',
            value: 2,
          },
          {
            label: '外链',
            value: 3,
          },
        ]}
        radioProps={{
          onChange(e) {
            setMenuType(e.target.value);
          },
        }}
      />
      <LFormItemInput name="menuName" required label={`${menuLabels[menuType]}名称`} />
      {menuType !== 2 ? (
        <>
          <LFormItemInput name="menuUrl" required label="路由地址" />
        </>
      ) : (
        <LFormItemInput name="menuUrl" required label={`${menuLabels[menuType]}标识`} />
      )}
      <LFormItemInput name="sortId" required type="number" label="序号" />
      <LFormItemRadio
        label="状态"
        name="state"
        required
        initialValue={1}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 2,
          },
        ]}
      />
      <LFormItemTextArea name="menuDesc" required label={`${menuLabels[menuType]}描述`} />
    </LDrawerForm>
  );
};

export default BasicModal;

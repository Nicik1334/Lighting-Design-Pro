import TreeSlider from '@/components/common/TreeSlider';
import IconModal, { IconFont } from '@/components/system/IconModal';
import { awaitTime } from '@/utils';
import Icon, * as antIcons from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import type { LModalFormProps } from 'lighting-design';
import {
  LDrawerForm,
  LFormItem,
  LFormItemRadio,
  LFormItemTextArea,
  LTrigger,
  LForm,
  LFormItemInput,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { getMenuItem } from '../server';

const iconStyle = { fontSize: 20, color: '#10101090', verticalAlign: 'middle' };
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
  const [menuType, setMenuType] = useState<number>(1);
  const [visible, setVisible] = useState<boolean>(false);
  const [iconItem, setIconItem] = useState<string>('');
  const { loading } = useRequest(getMenuItem, {
    onSuccess: (result) => {
      if (result.success) {
        const { data: d } = result;
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
      setIconItem(data.icon || '');
    }
  }, [open, data, form]);

  const ItemTree = (...props: any[]) => {
    return (
      <TreeSlider
        placeholder="筛选菜单"
        loading={loading}
        checkable={false}
        treeList={theeData}
        titleRender={(item: any) => {
          return (
            <>
              {item.nodeName}
              {item?.children && item?.children.length > 0 && (
                <span
                  style={{ color: '#BDBDBD', letterSpacing: 1 }}
                >{` (${item?.children.length})`}</span>
              )}
            </>
          );
        }}
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
      width={600}
      title={data ? '修改信息' : '新建菜单'}
      onFinish={async (values) => {
        await awaitTime(); // 发起请求
        console.log('onFinish-values ', values);
        onChange(); // 响应成功后，刷新表格
        return true;
      }}
      layout="vertical"
      {...restProps}
    >
      <Row>
        <Col span={24}>
          <LFormItem name="nodeId" required label="上级菜单" tooltip="指当前菜单停靠的菜单归属">
            <TriggerItem />
          </LFormItem>
        </Col>
        <Col span={10}>
          <LFormItemInput
            name="menuName"
            required
            tooltip="菜单位置显示的说明信息"
            label="菜单标题"
          />
        </Col>
        <Col span={12} offset={2}>
          <LFormItemInput
            name="sortId"
            tooltip="根据序号升序排列"
            required
            type="number"
            label="显示排序"
          />
        </Col>
        <Col span={12}>
          <LFormItemRadio
            label="菜单类型"
            name="menuType"
            disabled={data}
            required
            initialValue={menuType}
            options={[
              {
                label: '目录',
                value: 0,
              },
              {
                label: '菜单',
                value: 1,
              },
              {
                label: '按钮',
                value: 2,
              },
            ]}
            radioProps={{
              onChange(e) {
                setMenuType(e.target.value);
              },
            }}
          />
        </Col>
        <Col span={12}>
          <LFormItemInput
            name="icon"
            label="菜单图标"
            style={{ cursor: 'pointer' }}
            contentAfter={
              iconItem &&
              (antIcons[iconItem] ? (
                <Icon style={iconStyle} component={antIcons[iconItem]} />
              ) : (
                <IconFont type={iconItem} style={iconStyle} />
              ))
            }
            inputProps={{
              onClick: () => setVisible(true),
              onChange: (e) => {
                if (!e) setIconItem('');
              },
            }}
          />
        </Col>
        <Col span={12}>
          <LFormItemRadio
            label="菜单状态"
            name="state"
            tooltip="需要显示在菜单列表的菜单设置为显示状态"
            required
            initialValue={1}
            options={[
              {
                label: '显示',
                value: 1,
              },
              {
                label: '隐藏',
                value: 0,
              },
            ]}
          />
        </Col>
      </Row>
      {menuType !== 2 ? (
        <>
          <LFormItemInput
            tooltip="访问此页面自定义的url地址"
            name="menuUrl"
            required
            label="路由地址"
          />
        </>
      ) : (
        <>
          <LFormItemInput name="menuUrl" tooltip="前端权限控制按钮是否显示" label="按钮标识" />
          <LFormItemInput
            tooltip="配置所需要使用到的URL权限，否则在设置用户角色时，接口将无权访问。"
            name="menuUrl"
            label="路由地址"
          />
        </>
      )}
      <LFormItemTextArea name="menuDesc" label="菜单描述" />
      <IconModal
        open={visible}
        onChange={(key) => {
          setVisible(false);
          form.setFieldValue('icon', key);
          setIconItem(key);
        }}
        cancel={setVisible}
      />
    </LDrawerForm>
  );
};

export default BasicModal;

import type { FormInstance } from 'antd';
import { Popconfirm, Space, Switch, Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ColumnsType } from 'antd/lib/table';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput, LTable, LFormItemSelect } from 'lighting-design';
import BasicModal from './component/Modal';
import MenuModal from './component/Menu-modal';
import { awaitTime } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { getPageRole } from './server';
import { DeleteOutlined, EditOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import PopSwitchState from '@/components/system/PopSwitchState';

interface RoleProps {}
const Role: FC<RoleProps> = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const [menuRecord, setMenuRecord] = useState<Record<string, any>>();
  const columns: ColumnsType<any> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      key: 'roleDesc',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (state, record) => {
        return (
          <PopSwitchState
            checked={state === 1}
            title={`您确定 ${state === 1 ? '禁用' : '启用'} ${record.roleName} 吗？`}
            onConfirm={async () => {
              await awaitTime(1000);
              tableRef.current?.onSearch();
            }}
          />
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
    },
    {
      key: 'actions',
      title: '操作',
      width: 260,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <Button
              onClick={() => {
                setEditablRecord({ ...record });
                setOpen(true);
              }}
              type="link"
              icon={<EditOutlined />}
            >
              修改
            </Button>
            <Button
              type="link"
              icon={<MenuUnfoldOutlined />}
              onClick={() => {
                setMenuRecord({ ...record });
                setVisible(true);
              }}
            >
              菜单权限
            </Button>
            <Popconfirm
              placement="topRight"
              title="确认删除?"
              onConfirm={async () => {
                await awaitTime(1000);
                tableRef.current?.onReload();
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" danger icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const formItems = [
    <LFormItemInput key="0" name="name" label="角色名称" />,
    <LFormItemSelect
      key="1"
      name="state"
      options={[
        {
          label: '启用',
          value: '1',
        },
        {
          label: '禁用',
          value: '0',
        },
      ]}
      label="状态"
    />,
  ];

  return (
    <PageContainer
      waterMarkProps={{
        content: '超级管理员',
      }}
    >
      <ProCard bordered={false}>
        <LTable
          tableLayout="fixed"
          isSort
          rowKey="roleId"
          loading={{ size: 'large', tip: '加载中...' }}
          toolbarLeft={
            <>
              <Button
                type="primary"
                onClick={() => {
                  setEditablRecord(undefined);
                  setOpen(true);
                }}
              >
                新增角色
              </Button>
            </>
          }
          scroll={{ x: 1200 }}
          formItems={formItems}
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          request={getPageRole}
        />

        <BasicModal
          open={open}
          onOpenChange={setOpen}
          data={editableRecord}
          onChange={() => {
            tableRef.current?.onReload();
          }}
        />
        <MenuModal
          open={visible}
          onOpenChange={setVisible}
          data={menuRecord}
          onChange={() => {
            tableRef.current?.onReload();
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Role;

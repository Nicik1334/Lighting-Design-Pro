import type { FormInstance } from 'antd';
import { Button, Popconfirm, Space, Switch } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { LTableInstance } from 'lighting-design';
import { LTable } from 'lighting-design';
import BasicModal from './Modal';
import type { ColumnsType } from 'antd/lib/table/interface';
import { ProCard } from '@ant-design/pro-components';
import { OrgController } from './server';
import type { DataNode } from 'antd/lib/tree';
import { awaitTime } from '@/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PopSwitchState from '@/components/system/PopSwitchState';

const onFormat = (nodes: any[]): DataNode[] => {
  nodes.forEach((res) => {
    res.key = res.value;
    res.title = res.label;
    if (res.children) {
      onFormat(res.children);
    }
  });
  return nodes;
};

interface UserProps {}
const User: FC<UserProps> = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();

  const columns: ColumnsType<any> = [
    {
      title: '组织名称',
      align: 'center',
      dataIndex: 'orgName',
    },
    {
      title: '组织编码',
      align: 'center',
      dataIndex: 'orgId',
    },
    {
      align: 'center',
      title: '组织说明',
      dataIndex: 'orgDesc',
      ellipsis: true,
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
            title={`您确定 ${state === 1 ? '禁用' : '启用'} ${record.orgName} 吗？`}
            onConfirm={async () => {
              await awaitTime(1000);
              tableRef.current?.onSearch();
            }}
          />
        );
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 160,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setEditablRecord({
                  ...record,
                });
                setOpen(true);
              }}
            >
              修改
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

  return (
    <PageContainer
      waterMarkProps={{
        content: '超级管理员',
      }}
    >
      <ProCard bordered={false}>
        <LTable
          rowKey="orgId"
          loading={{ size: 'large', tip: '加载中...' }}
          scroll={{ x: 1200 }}
          toolbarLeft={
            <>
              <Button
                type="primary"
                onClick={() => {
                  setEditablRecord(undefined);
                  setOpen(true);
                }}
              >
                新增
              </Button>
            </>
          }
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          pagination={false}
          request={OrgController}
        />
        <BasicModal
          open={open}
          onOpenChange={setOpen}
          data={editableRecord}
          onChange={() => {
            tableRef.current?.onReload();
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default User;

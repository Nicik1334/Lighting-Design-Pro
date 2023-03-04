import type { FormInstance } from 'antd';
import { Button, Divider, Modal, Popconfirm, Space, Switch } from 'antd';
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
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
          <Switch
            checked={state === 1}
            onChange={() => {
              Modal.confirm({
                title: '系统提示',
                icon: <ExclamationCircleOutlined />,
                content: `您确定 ${state === 1 ? '禁用' : '启用'} ${record.orgName} 吗？`,
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  tableRef.current?.onSearch();
                },
                onCancel: () => {},
              });
            }}
            unCheckedChildren="禁用"
            checkedChildren="启用"
          />
        );
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 140,
      render: (_, record) => {
        return (
          <Space align="center">
            <a
              onClick={() => {
                setEditablRecord({
                  ...record,
                });
                setOpen(true);
              }}
            >
              修改
            </a>
            <Divider type="vertical" />
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
              <a>删除</a>
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

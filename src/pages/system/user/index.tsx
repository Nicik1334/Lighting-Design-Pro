import type { FormInstance } from 'antd';
import { Divider, Popconfirm, Space, Table } from 'antd';
import { Button, Tag } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ColumnsType } from 'antd/lib/table';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput, LTable } from 'lighting-design';
import BasicModal from './Modal';
import { awaitTime } from '@/utils';
import { genderLabels, userStatusLabels } from '@/constants';
import type { TableRowSelection } from 'antd/lib/table/interface';
import { ProCard } from '@ant-design/pro-components';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { getUserList } from './server';

interface UserProps {}
const User: FC<UserProps> = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const columns: ColumnsType<any> = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
    },
    {
      title: '用户年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      render: (_, record) => {
        if (record.gender) {
          const tagTypes = {
            '0': 'pink',
            '1': 'blue',
          };
          return <Tag color={tagTypes[record.gender]}>{genderLabels[record.gender]}</Tag>;
        }
        return <span />;
      },
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 230,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      key: 'userStatus',
      align: 'center',
      render: (_, row) => {
        if (row.userStatus) {
          const tagTypes = {
            '1': 'success',
            '2': 'error',
            '3': 'warning',
          };
          return <Tag color={tagTypes[row.userStatus]}>{userStatusLabels[row.userStatus]}</Tag>;
        }
        return <span />;
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
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
              编辑
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

  const formItems = [
    <LFormItemInput key="0" name="name" label="姓名" />,
    <LFormItemInput key="1" name="phone" type="phone" label="手机号码" />,
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

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
          rowKey="id"
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
                新增
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setLoading(true);
                  awaitTime(1000);
                  setLoading(false);
                }}
                disabled={selectedRowKeys.length === 0}
                loading={loading}
              >
                删除
              </Button>
              <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length !== 0 ? `选中了 ${selectedRowKeys.length} 条数据` : ''}
              </span>
            </>
          }
          toolbarRight={
            <>
              <Button type="default" icon={<DownloadOutlined />} onClick={() => {}}>
                导入
              </Button>
              <Button icon={<UploadOutlined />} type="default" onClick={() => {}}>
                导出
              </Button>
            </>
          }
          rowSelection={rowSelection}
          formItems={formItems}
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          request={getUserList}
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

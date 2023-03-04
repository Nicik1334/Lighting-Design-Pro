import type { FormInstance } from 'antd';
import { Button, Divider, Modal, Popconfirm, Space, Switch, Table, Tag } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { LTableInstance } from 'lighting-design';
import { LTable } from 'lighting-design';
import BasicModal from './component/MenuModel';
import type { ColumnsType, TableRowSelection } from 'antd/lib/table/interface';
import { ProCard } from '@ant-design/pro-components';
import { getMenuList } from './server';
import type { DataNode } from 'antd/lib/tree';
import { awaitTime } from '@/utils';
import { ArrowsAltOutlined, ExclamationCircleOutlined, ShrinkOutlined } from '@ant-design/icons';

const dataList: React.Key[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node: any = data[i];
    dataList.push(node.nodeId);
    if (node.children) {
      generateList(node.children);
    }
  }
};

const Menu: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<any> = [
    {
      title: '菜单名称',
      dataIndex: 'nodeName',
      align: 'center',
    },
    {
      title: '序号',
      dataIndex: 'sortId',
      align: 'center',
    },
    {
      title: '菜单类型',
      align: 'center',
      render(record) {
        return (
          <>
            {record.menuType === 2 ? <Tag color="success">按钮</Tag> : <Tag color="blue">菜单</Tag>}
          </>
        );
      },
    },

    {
      title: '菜单描述',
      dataIndex: 'menuDesc',
      align: 'center',
    },
    {
      title: '菜单链接',
      dataIndex: 'menuUrl',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (_, record) => {
        return (
          <Switch
            checked={record.state === 1}
            onChange={() => {
              Modal.confirm({
                title: '系统提示',
                icon: <ExclamationCircleOutlined />,
                content: `您确定 ${record.state === 1 ? '禁用' : '启用'} ${record.menuName} 吗？`,
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

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: (newKeys) => setSelectedRowKeys(newKeys),
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
          rowKey="nodeId"
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
              <Button
                icon={expandedRowKeys.length > 0 ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                onClick={() => {
                  if (expandedRowKeys.length > 0) {
                    setExpandedRowKeys([]);
                  } else {
                    setExpandedRowKeys(dataList);
                  }
                }}
              >
                {expandedRowKeys.length > 0 ? '折叠' : '展开'}
              </Button>
              <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length !== 0 ? `选中了 ${selectedRowKeys.length} 条数据` : ''}
              </span>
            </>
          }
          tableRef={tableRef}
          formRef={formRef}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          request={async () => {
            const result = await getMenuList({});
            const { data } = result;
            if (result.success) {
              generateList(data);
            }
            return result;
          }}
          expandable={{
            expandedRowKeys,
            onExpandedRowsChange(expandedKeys: React.Key[] | any) {
              setExpandedRowKeys(expandedKeys);
            },
          }}
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

export default Menu;

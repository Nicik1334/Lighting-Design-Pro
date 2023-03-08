import type { FormInstance } from 'antd';
import { Popconfirm, Space, Tag, Button } from 'antd';
import type { FC } from 'react';
import { useContext, useEffect } from 'react';
import { useRef, useState } from 'react';
import type { LTableInstance } from 'lighting-design';
import { LTable } from 'lighting-design';
import type { ColumnsType } from 'antd/lib/table';
import { getDetailList } from '../../service';
import { awaitTime } from '@/utils';
import { DicContext } from '../..';
import ValueModal from './modal';
import type { DicValueItemType } from '../../interface';
import { ProCard } from '@ant-design/pro-components';

const DetailList: FC = () => {
  const formRef = useRef<FormInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const tableRef = useRef<LTableInstance>();
  const { record } = useContext(DicContext);

  const columns: ColumnsType<DicValueItemType> = [
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      align: 'center',
    },
    {
      title: '字典标签',
      dataIndex: 'label',
      key: 'label',
      align: 'center',
    },
    {
      title: '字典键值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_, records) => {
        const renderTag = () => {
          return records.status === 1 ? (
            <Tag color="success">启用</Tag>
          ) : records.status === 0 ? (
            <Tag color="error">停用</Tag>
          ) : (
            <></>
          );
        };
        return renderTag();
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      width: 150,
      render: (_, records) => {
        return (
          <Space className="action_bar">
            <Button
              type="link"
              onClick={() => {
                setEditablRecord({ ...records });
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
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    if (record?.id) tableRef.current?.onReload();
  }, [record]);

  return (
    <ProCard
      title={
        <Space>
          <strong>{record?.name}</strong>
          <br />
          <span>{record?.code}</span>
        </Space>
      }
    >
      <LTable
        rowKey="id"
        loading={{ size: 'large', tip: '加载中...' }}
        tableRef={tableRef}
        formRef={formRef}
        pagination={false}
        size="small"
        columns={columns}
        request={getDetailList}
        autoRequest={false}
        scroll={{ x: 600 }}
        toolbarRight={
          record?.id && (
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
          )
        }
        queryFormProps={{
          submitter: {
            showReset: false,
          },
        }}
        toolbarActionConfig={{
          showColumnSetting: false,
          showDensity: false,
          showFullscreen: false,
          showReload: false,
        }}
      />
      <ValueModal
        open={open}
        onOpenChange={setOpen}
        data={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
    </ProCard>
  );
};

export default DetailList;

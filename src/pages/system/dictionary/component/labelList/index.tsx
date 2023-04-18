import type { FormInstance } from 'antd';
import { Popconfirm, Space, Button, Tag } from 'antd';
import type { FC } from 'react';
import { useRef, useState, useContext } from 'react';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput, LFormItemSelect, LTable } from 'lighting-design';
import type { ColumnsType } from 'antd/lib/table';
import { getdictList } from '../../service';
import { awaitTime } from '@/utils';
import { DicContext } from '../..';
import type { DictionaryItemType } from '../../interface';
import LabelModal from './modal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useThrottleFn } from 'ahooks';

const LabelList: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();
  const { setRecord } = useContext(DicContext);
  const { run } = useThrottleFn((record) => setRecord({ ...record }), { wait: 500 });

  const formItems = [
    <LFormItemInput key="0" name="name" label="字典名称" />,
    <LFormItemSelect
      label="状态"
      name="status"
      style={{ width: 200 }}
      key="3"
      options={[
        {
          label: '正常',
          value: '1',
        },
        {
          label: '停用',
          value: '0',
        },
      ]}
    />,
  ];
  const columns: ColumnsType<DictionaryItemType> = [
    {
      title: '字典名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '字典标识',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      render(value, record) {
        return (
          <Tag color="processing">
            <a onClick={() => setRecord({ ...record })}>{value}</a>
          </Tag>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_, record) => {
        const renderTag = () => {
          return record.status === 1 ? (
            <Tag color="success">启用</Tag>
          ) : record.status === 0 ? (
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
      fixed: 'right',
      width: 150,
      render: (_, record) => {
        return (
          <Space className="action_bar">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setEditablRecord({ ...record });
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
    <>
      <LTable
        rowKey="id"
        tableRef={tableRef}
        scroll={{ x: 800 }}
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
        toolbarActionConfig={{
          showColumnSetting: false,
          showDensity: false,
          showFullscreen: false,
          showReload: false,
        }}
        queryFormProps={{
          isSpace: true,
          submitter: {
            onReset() {
              setRecord(undefined);
            },
          },
        }}
        size="middle"
        formItems={formItems}
        formRef={formRef}
        columns={columns}
        pagination={{
          pageSize: 6,
        }}
        onRow={(record) => {
          return {
            style: { cursor: 'pointer' },
            onClick: () => run({ ...record }),
          };
        }}
        request={getdictList}
      />
      <LabelModal
        open={open}
        onOpenChange={setOpen}
        data={editableRecord}
        onChange={() => {
          tableRef.current?.onReload();
        }}
      />
    </>
  );
};

export default LabelList;

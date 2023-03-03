import type { FormInstance } from 'antd';
import { Divider, Popconfirm, Space } from 'antd';
import { Tag } from 'antd';
import { Button } from 'antd';
import type { FC } from 'react';
import { useContext } from 'react';
import { useRef, useState } from 'react';
import type { LTableInstance } from 'lighting-design';
import { LFormItemInput, LFormItemSelect } from 'lighting-design';
import { LTable } from 'lighting-design';
import type { ColumnsType } from 'antd/lib/table';
import { getdictList } from '../../service';
import { awaitTime } from '@/utils';
import { DicContext } from '../..';
import type { DictionaryItemType } from '../../interface';
import LabelModal from './modal';

const LabelList: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();

  const { setRecord } = useContext(DicContext);

  const formItems = [
    <LFormItemInput key="0" name="name" label="字典名称" />,
    <LFormItemSelect
      label="状态"
      name="status"
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
    <>
      <LTable
        rowKey="id"
        rowClassName="lightd-table-row"
        loading={{ size: 'large', tip: '加载中...' }}
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
          submitter: {
            onReset() {
              setRecord(undefined);
            },
          },
        }}
        formItems={formItems}
        formRef={formRef}
        columns={columns}
        pagination={{
          pageSize: 6,
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

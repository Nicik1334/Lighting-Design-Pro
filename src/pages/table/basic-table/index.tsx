import { awaitTime } from '@/utils';
import { PageContainer } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Tag } from 'antd';
import { Button, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { LTableInstance } from 'lighting-design';
import {
  LFormItemCheckbox,
  LFormItemDatePicker,
  LFormItemRadio,
  LFormItemTimePicker,
} from 'lighting-design';
import { LFormItemInput, LFormItemSelect, LTable } from 'lighting-design';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import BasicModal from './BasicModal';
import type { ColumnsItemType } from './service';
import { apiGetUserList } from './service';

const BasicTable: FC = () => {
  const formRef = useRef<FormInstance>();
  const tableRef = useRef<LTableInstance>();
  const [open, setOpen] = useState(false);
  const [editableRecord, setEditablRecord] = useState<Record<string, any>>();

  const columns: ColumnsType<ColumnsItemType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      className: 'my-columns',
    },
    {
      title: '人员类型',
      dataIndex: 'personType',
      key: 'personType',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'center',
      render: (_, record) => {
        const renderTag = () => {
          return record.type === '1' ? (
            <Tag color="green">{record.typeName}</Tag>
          ) : record.type === '2' ? (
            <Tag color="volcano">{record.typeName}</Tag>
          ) : (
            <Tag color="blue">{record.typeName}</Tag>
          );
        };
        return renderTag();
      },
    },
    {
      title: '预约时间',
      dataIndex: 'makeDate',
      key: 'makeDate',
      align: 'center',
    },
    {
      title: '预约项目',
      dataIndex: 'makeProjectName',
      key: 'makeProjectName',
      align: 'center',
    },
    {
      title: '来源',
      dataIndex: 'makeSourceName',
      key: 'makeSourceName',
      align: 'center',
      render: (_, record) => {
        const renderTag = () => {
          return record.makeSource === '1' ? (
            <Tag color="blue">{record.makeSourceName}</Tag>
          ) : record.makeSource === '2' ? (
            <Tag color="orange">{record.makeSourceName}</Tag>
          ) : (
            <Tag color="green">{record.makeSourceName}</Tag>
          );
        };
        return renderTag();
      },
    },
  ];

  const formItems = [
    <LFormItemInput key="0" name="name" label="姓名" />,
    <LFormItemInput key="1" name="phone" type="phone" label="手机号码" />,
    <LFormItemSelect
      label="类型"
      name="type"
      key="2"
      request={async () => {
        const result = await awaitTime([
          {
            label: '舒适性',
            value: '1',
          },
          {
            label: '经济性',
            value: '2',
          },
          {
            label: '无痛性',
            value: '3',
          },
        ]);
        if (result.success) return result.data;
      }}
    />,
    <LFormItemSelect
      label="人员类型"
      name="personType"
      key="3"
      options={[
        {
          label: '成人',
          value: '1',
        },
        {
          label: '儿童',
          value: '2',
        },
      ]}
    />,
    <LFormItemDatePicker label="预约时间" name="makeDate" key="4" picker="date" />,
    <LFormItemTimePicker label="停留时间" name="makeTime" key="5" />,
    <LFormItemCheckbox
      label="预约项目"
      name="makeProject"
      key="6"
      options={[
        {
          label: '种牙',
          value: '1',
        },
        {
          label: '补牙',
          value: '2',
        },
        {
          label: '拔牙',
          value: '3',
        },
      ]}
    />,
    <LFormItemRadio
      label="来源"
      name="makeSource"
      key="7"
      initialValue="1"
      options={[
        {
          label: '门店',
          value: '1',
        },
        {
          label: '美团',
          value: '2',
        },
        {
          label: '微信',
          value: '3',
        },
      ]}
    />,
  ];
  return (
    <>
      <PageContainer>
        <LTable
          tableLayout="fixed"
          rowClassName="lightd-table-row"
          rootClassName="my-table-root"
          tableClassName="my-table"
          rowKey="key"
          isSort
          loading={{ size: 'large', tip: '加载中...' }}
          tableRef={tableRef}
          queryFormProps={{
            showColsNumber: 3,
          }}
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
                onClick={() => {
                  setEditablRecord({
                    makeDate: '2023-02-01',
                    makeProject: ['1'],
                    makeSource: '1',
                    name: '张三',
                    phone: '12345678999',
                    type: '1',
                    personType: '1',
                  });
                  setOpen(true);
                }}
              >
                编辑
              </Button>
            </>
          }
          toolbarRight={
            <Button type="primary" onClick={() => tableRef.current?.onReset()}>
              刷新数据
            </Button>
          }
          formItems={formItems}
          formRef={formRef}
          columns={columns}
          request={async (params, requestType) => {
            const res: Record<string, any> = await apiGetUserList();
            return {
              success: true,
              data: res.data,
              total: res.total,
            };
          }}
        />
        <ConfigProvider
          getPopupContainer={() => tableRef.current?.rootRef.current || document.body}
        >
          <BasicModal
            open={open}
            onOpenChange={setOpen}
            data={editableRecord}
            onChange={() => {
              tableRef.current?.onReload();
            }}
          />
        </ConfigProvider>
      </PageContainer>
    </>
  );
};

export default BasicTable;

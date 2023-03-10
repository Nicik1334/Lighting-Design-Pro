import type { TreeSelectProps } from 'antd';
import {
  LForm,
  LFormItemAddress,
  LFormItemAutoComplete,
  LFormItemCaptcha,
  LFormItemCascader,
  LFormItemCheckbox,
  LFormItemColor,
  LFormItemDatePicker,
  LFormItemInput,
  LFormItemNumber,
  LFormItemPassword,
  LFormItemRadio,
  LFormItemRate,
  LFormItemSegmented,
  LFormItemSelect,
  LFormItemSlider,
  LFormItemSwitch,
  LFormItemTextArea,
  LFormItemTimePicker,
  LFormItemTreeSelect,
  LFormItemUpload,
  LTypeit,
} from 'lighting-design';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { addressOptions, mockVal } from './service';
import type { DefaultOptionType } from 'antd/lib/select';
import { ProCard } from '@ant-design/pro-components';

const BasicForm: FC<Record<string, any>> = () => {
  const [form] = LForm.useForm();

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([
    { id: 1, pId: 0, value: '1', title: 'Expand to load' },
    { id: 2, pId: 0, value: '2', title: 'Expand to load' },
    { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
  ]);

  const genTreeNode = (parentId: number, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  const onLoadData: TreeSelectProps['loadData'] = ({ id }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setTreeData(
          treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]),
        );
        resolve(undefined);
      }, 300);
    });
  const onFinish = async (values: Record<string, any>) => {
    console.log(values);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <PageContainer
      content={
        <LTypeit
          options={{
            cursor: false,
            speed: 30,
          }}
          getBeforeInit={(instance) => {
            return instance.type(
              '??????????????????????????????????????????????????????????????????????????????????????????????????????',
            );
          }}
        />
      }
      waterMarkProps={{
        content: '???????????????',
      }}
    >
      <ProCard bordered={false}>
        <LForm
          labelWidth={90}
          submitter={{ buttonAlign: 90 }}
          form={form}
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          initialValues={{ LFormItemInput: '????????????' }}
          onFinish={onFinish}
        >
          <LFormItemInput name="LFormItemInput" required label="?????????1" tooltip="??????????????????" />
          <LFormItemNumber
            name="LFormItemNumber"
            required
            label="?????????2"
            contentAfter={<div>???</div>}
          />
          <LFormItemPassword name="LFormItemPassword" required label="?????????" />
          <LFormItemTextArea name="LFormItemTextArea" required label="??????" />
          <LFormItemCaptcha
            name="LFormItemCaptcha"
            required
            label="?????????"
            type="inline"
            cacheKey={'Captcha'}
          />
          <LFormItemAutoComplete
            name="LFormItemAutoComplete"
            required
            label="????????????"
            options={autoCompleteOptions}
            onSearch={(searchText) =>
              setAutoCompleteOptions(
                !searchText
                  ? []
                  : [mockVal(searchText, 1), mockVal(searchText, 2), mockVal(searchText, 3)],
              )
            }
          />
          <LFormItemSelect
            label="????????????"
            name="LFormItemSelect"
            all
            required
            options={[
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
              { label: 'C', value: 'c' },
            ]}
          />

          <LFormItemTreeSelect
            label="????????????"
            name="LFormItemTreeSelect"
            required
            treeData={treeData}
            loadData={onLoadData}
            treeCheckable
            treeSelectProps={{
              treeDataSimpleMode: true,
            }}
          />

          <LFormItemCascader label="????????????" name="cascader" required options={addressOptions} />
          <LFormItemAddress
            label="????????????"
            names={['location', 'address']}
            required
            options={addressOptions}
          />
          <LFormItemDatePicker
            label="????????????"
            name="LFormItemDatePicker1"
            required
            disabledDateBefore={1}
          />
          <LFormItemDatePicker
            label="????????????"
            name="LFormItemDatePicker2"
            required
            disabledDateAfter={1}
            rangePicker
          />
          <LFormItemTimePicker label="????????????" name="LFormItemTimePicker1" required />
          <LFormItemTimePicker label="????????????" name="LFormItemTimePicker2" required rangePicker />
          <LFormItemSlider name="LFormItemSlider" label="????????????" required />
          <LFormItemSegmented
            label="?????????"
            required
            name="LFormItemSegmented"
            options={[
              { label: 'List', value: 'List' },
              { label: 'Kanban', value: 'Kanban' },
              { label: 'item', value: 'item' },
            ]}
          />
          <LFormItemCheckbox
            label="?????????"
            name="LFormItemCheckbox"
            beforeAll
            required
            options={[
              { label: '??????', value: '1' },
              { label: '??????', value: '2' },
              { label: '?????????', value: '3' },
            ]}
          />
          <LFormItemRadio
            label="?????????"
            name="LFormItemRadio"
            all
            required
            options={[
              { label: 'Unresolved', value: 'Unresolved' },
              { label: 'Resolved', value: 'Resolved' },
              { label: 'Resolving', value: 'Resolving' },
            ]}
          />
          <LFormItemUpload
            name="LFormItemUpload1"
            label="????????????"
            accept=".jpg, .jpeg"
            action=""
            required
          />
          <LFormItemRate label="??????" name="LFormItemRate" initialValue={3} required />
          <LFormItemColor name="LFormItemColor" colorType="chrome" label="????????????" required />
          <LFormItemSwitch name="LFormItemSwitch" label="??????" tooltip="????????????" />
          <LFormItemUpload name="LFormItemUpload3" label="????????????" required uploadType="image" />
          <LFormItemUpload required uploadType="dragger" name="LFormItemUpload4" label="????????????" />
        </LForm>
      </ProCard>
    </PageContainer>
  );
};

export default BasicForm;

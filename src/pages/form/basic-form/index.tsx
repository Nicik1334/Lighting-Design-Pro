import type { TreeSelectProps } from 'antd';
import { Card } from 'antd';
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
  LTrigger,
  LTypeit,
} from 'lighting-design';
import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { addressOptions, mockVal } from './service';
import type { DefaultOptionType } from 'antd/lib/select';

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
  return (
    <PageContainer
      content={
        <LTypeit
          options={{
            afterComplete: (instance: { destroy: () => void }) => {
              instance.destroy();
            },
            speed: 30,
          }}
          getBeforeInit={(instance) => {
            return instance.type(
              '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
            );
          }}
        />
      }
      waterMarkProps={{
        content: '超级管理员',
      }}
    >
      <Card bordered={false}>
        <LForm
          labelWidth={90}
          submitter={{ buttonAlign: 90 }}
          form={form}
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          initialValues={{ LFormItemInput: '基础表单' }}
          onFinish={onFinish}
        >
          <LFormItemInput name="LFormItemInput" required label="输入框1" tooltip="禁止输入空格" />
          <LFormItemNumber
            name="LFormItemNumber"
            required
            label="输入框2"
            contentAfter={<div>元</div>}
          />
          <LFormItemPassword name="LFormItemPassword" required label="密码框" />
          <LFormItemTextArea name="LFormItemTextArea" required label="备注" />
          <LFormItemCaptcha
            name="LFormItemCaptcha"
            required
            label="验证码"
            type="inline"
            cacheKey={'Captcha'}
          />
          <LFormItemAutoComplete
            name="LFormItemAutoComplete"
            required
            label="自动联想"
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
            label="下拉选择"
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
            label="树形选择"
            name="LFormItemTreeSelect"
            required
            treeData={treeData}
            loadData={onLoadData}
            treeCheckable
            treeSelectProps={{
              treeDataSimpleMode: true,
            }}
          />

          <LFormItemCascader label="级联选择" name="cascader" required options={addressOptions} />
          <LFormItemAddress
            label="地址选择"
            names={['location', 'address']}
            required
            options={addressOptions}
          />
          <LFormItemDatePicker
            label="日期选择"
            name="LFormItemDatePicker1"
            required
            disabledDateBefore={1}
          />
          <LFormItemDatePicker
            label="范围选择"
            name="LFormItemDatePicker2"
            required
            disabledDateAfter={1}
            rangePicker
          />
          <LFormItemTimePicker label="时间选择" name="LFormItemTimePicker1" required />
          <LFormItemTimePicker label="范围选择" name="LFormItemTimePicker2" required rangePicker />
          <LFormItemSlider name="LFormItemSlider" label="滑块选择" required />
          <LFormItemSegmented
            label="分段器"
            required
            name="LFormItemSegmented"
            options={[
              { label: 'List', value: 'List' },
              { label: 'Kanban', value: 'Kanban' },
              { label: 'item', value: 'item' },
            ]}
          />
          <LFormItemCheckbox
            label="多选框"
            name="LFormItemCheckbox"
            beforeAll
            required
            options={[
              { label: '上班', value: '1' },
              { label: '睡觉', value: '2' },
              { label: '打豆豆', value: '3' },
            ]}
          />
          <LFormItemRadio
            label="单选框"
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
            label="默认上传"
            accept=".jpg, .jpeg"
            action=""
            required
          />
          <LFormItemRate label="评分" name="LFormItemRate" initialValue={3} required />
          <LFormItemColor name="LFormItemColor" colorType="chrome" label="颜色选择" required />
          <LFormItemSwitch name="LFormItemSwitch" label="开关" tooltip="开关按钮" />
          <LFormItemUpload name="LFormItemUpload3" label="图片上传" required uploadType="image" />
          <LFormItemUpload required uploadType="dragger" name="LFormItemUpload4" label="拖动上传" />
        </LForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;

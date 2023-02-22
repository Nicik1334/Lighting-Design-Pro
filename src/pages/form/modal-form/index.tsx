import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Demo1 from './components/demo1';
import type { TabsProps } from 'antd';
import { Card } from 'antd';
import { Tabs } from 'antd';
import Demo2 from './components/demo2';

const BasicForm: FC<Record<string, any>> = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `弹窗表单`,
      children: <Demo1 />,
    },
    {
      key: '2',
      label: `抽屉表单`,
      children: <Demo2 />,
    },
  ];
  return (
    <PageContainer
      content="需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 弹窗表单 在当前页面正中打开一个浮层，承载相应的操作。"
      waterMarkProps={{
        content: '超级管理员',
      }}
    >
      <Card>
        <Tabs items={items} />
      </Card>
    </PageContainer>
  );
};

export default BasicForm;

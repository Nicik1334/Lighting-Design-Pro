import { LForm } from 'lighting-design';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const BasicForm: FC<Record<string, any>> = () => {
  const [form] = LForm.useForm();

  return (
    <PageContainer
      breadcrumbRender={false}
      content="需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 弹窗表单 在当前页面正中打开一个浮层，承载相应的操作。"
      waterMarkProps={{
        content: '超级管理员',
      }}
    >
      1
    </PageContainer>
  );
};

export default BasicForm;

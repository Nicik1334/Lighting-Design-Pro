import type { LStepsFormActionRef } from 'lighting-design';
import { LFormItemInput, LFormItemSelect, LStepsForm } from 'lighting-design';
import type { FC } from 'react';
import { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { awaitTime } from '@/utils';
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Divider,
  Form,
  message,
  Result,
  Space,
  Statistic,
} from 'antd';

const BasicForm: FC<Record<string, any>> = () => {
  const actionRef = useRef<LStepsFormActionRef>();

  return (
    <PageContainer
      breadcrumbRender={false}
      content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      waterMarkProps={{
        content: '超级管理员',
      }}
    >
      <Card>
        <LStepsForm
          submitter={{ buttonAlign: 90 }}
          formProps={{ labelWidth: 90 }}
          submitStepNum={2}
          onFinish={async (values) => {
            await awaitTime('', 1000);
            actionRef.current!.next();
          }}
          actionRef={actionRef}
        >
          <LStepsForm.StepForm
            title="填写转账信息"
            style={{ margin: 'auto', marginTop: 8, maxWidth: 500 }}
            onFinish={async (values) => {
              await awaitTime('', 100);
              console.log('填写转账信息', values);
            }}
            layout="vertical"
            initialValues={{
              receiverAccount: '1',
              province: '1',
              email: 'xxxx@qq.com',
              name: '超级管理员',
              amount: 5000,
            }}
          >
            <Card bordered={false}>
              <LFormItemSelect
                name="receiverAccount"
                label="付款账户"
                required
                options={[
                  { label: '付款账户1', value: '1' },
                  { label: '付款账户2', value: '2' },
                  { label: '付款账户3', value: '3' },
                ]}
              />
              <Form.Item label="收款账户" required style={{ marginBottom: 0 }}>
                <Space>
                  <LFormItemSelect
                    style={{ width: 100 }}
                    name="province"
                    options={[
                      { label: '支付宝', value: '1' },
                      { label: '微信', value: '2' },
                      { label: '银行账户', value: '3' },
                    ]}
                    selectProps={{
                      onChange() {},
                    }}
                  />
                  <LFormItemInput
                    style={{ width: 342 }}
                    name="email"
                    required
                    initialValue=""
                    placeholder="收款人账户"
                  />
                </Space>
              </Form.Item>
              <LFormItemInput name="name" required label="收款人姓名" />
              <LFormItemInput
                name="amount"
                required
                label="转账金额"
                inputProps={{
                  prefix: '￥',
                }}
              />
            </Card>
          </LStepsForm.StepForm>
          <LStepsForm.StepForm
            title="确认转账信息"
            onFinish={async (values) => {
              console.log('确认转账信息', values);
            }}
            style={{ margin: 'auto', maxWidth: 500 }}
            submitter={{
              showNext: false,
              forceShowSubmit: true,
            }}
          >
            <Card bordered={false}>
              <Alert
                closable
                showIcon
                message="确认转账后，资金将直接打入对方账户，无法退回。"
                style={{ marginBottom: 24 }}
              />
              <Descriptions column={1} bordered>
                <Descriptions.Item label="付款账户"> xxxxx</Descriptions.Item>
                <Descriptions.Item label="收款账户"> xxxxx</Descriptions.Item>
                <Descriptions.Item label="收款人姓名"> 超级管理员</Descriptions.Item>
                <Descriptions.Item label="转账金额">
                  <Statistic
                    value={5000}
                    suffix={
                      <span
                        style={{
                          fontSize: 14,
                        }}
                      >
                        元
                      </span>
                    }
                    precision={2}
                  />
                </Descriptions.Item>
              </Descriptions>
              <Divider style={{ margin: '24px 0' }} />
              <LFormItemInput
                label="支付密码"
                name="password"
                required={false}
                rules={[{ required: true, message: '需要支付密码才能进行支付' }]}
              />
            </Card>
          </LStepsForm.StepForm>
          <LStepsForm.StepForm title="结果页" submitter={false}>
            <Result
              status="success"
              title="操作成功"
              subTitle={
                <>
                  <Space size={30}>
                    <div>预计两小时内到账</div>
                  </Space>
                </>
              }
              extra={[
                <Button type="primary" key="back" onClick={() => message.info('点击返回页面')}>
                  返回首页
                </Button>,
                <Button key="reset" onClick={() => actionRef.current?.reset()}>
                  再转一笔
                </Button>,
              ]}
            />
          </LStepsForm.StepForm>
        </LStepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;

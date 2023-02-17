import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, message, Typography } from 'antd';
import React from 'react';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer breadcrumbRender={false}>
      <Card>
        <CodePreview>欢迎使用</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;

import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Hamster from '@/components/hamster';
import { LNumberRoll } from 'lighting-design';
import styles from './index.less';

const Dashboard: React.FC = () => {
  const [value, setValue] = useState<string>(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <PageContainer breadcrumbRender={false}>
      <Card style={{ height: '100%' }}>
        {/* <Button onClick={() => history.push('/404')}>404</Button>
        <Button onClick={() => history.push('/')}>首页</Button>
        <Button onClick={() => history.push('/form')}>form</Button> */}
        <Hamster />
        <LNumberRoll type="date" className={styles.numberStyle} value={value} />
      </Card>
    </PageContainer>
  );
};

export default Dashboard;

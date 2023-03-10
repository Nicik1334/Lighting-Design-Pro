import { PageContainer, ProCard } from '@ant-design/pro-components';
import moment from 'moment';
import React, { useState } from 'react';
import Hamster from '@/components/common/Hamster';
import { LNumberRoll, LTypeit } from 'lighting-design';
import styles from './index.less';
import { useRafInterval } from 'ahooks';

const Dashboard: React.FC = () => {
  const [value, setValue] = useState<string>(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
  useRafInterval(() => {
    setValue(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
  }, 1000);
  return (
    <PageContainer breadcrumbRender={false}>
      <ProCard>
        {/* <Button onClick={() => history.push('/404')}>404</Button>
        <Button onClick={() => history.push('/')}>首页</Button>
        <Button onClick={() => history.push('/form')}>form</Button> */}
        <Hamster />
        <LNumberRoll type="date" className={styles.numberStyle} value={value} />
        <LTypeit
          className={styles.typeit}
          options={{
            cursor: false,
            speed: 60,
            waitUntilVisible: true,
          }}
          getBeforeInit={(instance) => {
            return instance.type('时间就像奔跑的仓鼠，它总是不知疲倦地奔跑，永不停息。');
          }}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;

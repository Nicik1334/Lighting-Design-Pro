import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CSIndex from '@/components/cs';

const Dashboard: React.FC = () => {
  const [value, setValue] = useState<string>(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
  const [text] = useState('基于React、TypeScript、Ant Design、UmiJs、ahook等开发的后台模板组件。');
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
        {/* <Space align="center">
          当前时间：
          <LNumberRoll type="date" className={styles.numberStyle} value={value} />
        </Space> */}
        {/* <br /> */}
        {/* <div>
          <LTypeit
            style={{ fontFamily: 'cursive', fontSize: 26 }}
            options={{
              afterComplete: (instance: { destroy: () => void }) => {
                instance.destroy();
              },
              speed: 30,
            }}
            getBeforeInit={(instance) => {
              instance
                .type(text)
                .type('<strong style="color: #5d84f9">Lighting Design Pro</strong>', {
                  speed: 100,
                })
                .type(
                  '是基于 Ant Design UI 而开发的业务常用模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面开发。',
                );
              return instance;
            }}
          />
        </div> */}
        <CSIndex />
      </Card>
    </PageContainer>
  );
};

export default Dashboard;

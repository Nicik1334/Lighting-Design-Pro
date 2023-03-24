import { PageContainer, ProCard } from '@ant-design/pro-components';
import moment from 'moment';
import React, { useState, useContext } from 'react';
import Hamster from '@/components/common/Hamster';
import { LNumberRoll, LTypeit } from 'lighting-design';
import styles from './index.less';
import { useRafInterval } from 'ahooks';
import { TagViewContext } from '@/components/common/TabsView';
import { Button, Space, Tooltip } from 'antd';
import { history } from 'umi';

const Dashboard: React.FC = () => {
  const [value, setValue] = useState<string>(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
  useRafInterval(() => {
    setValue(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
  }, 1000);

  const { handleRefreshPage, handleClosePage, handleCloseAll, handleCloseOther } =
    useContext(TagViewContext);

  return (
    <PageContainer breadcrumbRender={false}>
      <ProCard>
        <Space>
          <Tooltip title="/">
            <Button onClick={() => history.push('/')}>刷新页面</Button>
          </Tooltip>
          <Tooltip title="/form">
            <Button onClick={() => history.push('/form')}>重定向</Button>
          </Tooltip>
          <Tooltip title="/system/meun">
            <Button onClick={() => history.push('/system/meun')}>无权限</Button>
          </Tooltip>
          <Tooltip title="/404">
            <Button onClick={() => history.push('/404')}>404</Button>
          </Tooltip>
          <Button
            onClick={() => {
              handleRefreshPage((tag) => ({ ...tag, path: '/dashboard' }));
            }}
          >
            刷新当前页面
          </Button>
          <Button
            onClick={() => {
              handleClosePage((tag) => {
                return {
                  ...tag,
                };
              });
            }}
          >
            关闭当前页面
          </Button>
          <Button
            onClick={() => {
              handleCloseOther();
            }}
          >
            关闭其他页面
          </Button>
          <Button
            onClick={() => {
              handleCloseAll();
            }}
          >
            关闭所有页面
          </Button>
        </Space>

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

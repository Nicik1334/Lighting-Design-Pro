import { ExpandOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import SwitchDark from '../SwitchDark';
import TimeRoll from '../TimeRoll';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <div className={`${styles.action} ${styles.hidden}`}>
        <TimeRoll format="yyyy-MM-DD HH:mm" />
      </div>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="搜索"
        options={[]}
      />
      <div
        className={`${styles.action} ${styles.fullscreen}  ${styles.hidden}`}
        title={!isFullScreen ? '全屏' : '退出全屏'}
        onClick={() => {
          const doc = document as any;
          const isFull: boolean = doc?.webkitIsFullScreen;
          setIsFullScreen(!isFull);
          isFull
            ? doc?.webkitExitFullscreen()
            : document.querySelector('html')?.requestFullscreen();
        }}
      >
        {isFullScreen ? (
          <FullscreenExitOutlined style={{ fontSize: 16 }} />
        ) : (
          <ExpandOutlined style={{ fontSize: 16 }} />
        )}
      </div>
      <div className={`${styles.action} ${styles.search}`}>
        <SwitchDark />
      </div>
      <Avatar menu />
    </Space>
  );
};
export default GlobalHeaderRight;

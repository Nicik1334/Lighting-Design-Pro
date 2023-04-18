import { ExpandOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import HeaderDark from '../HeaderDark';
import TimeRoll from '../../common/TimeRoll';
import Avatar from './AvatarDropdown';
import styles from './index.less';

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
      <div className={`${styles.action} ${styles.hidden}`} style={{ fontFamily: 'initial' }}>
        <TimeRoll format="yyyy-MM-DD HH:mm" />
      </div>
      <HeaderSearch className={`${styles.action} ${styles.fullscreen}  ${styles.hidden}`} />
      <div
        className={`${styles.action} ${styles.hidden}`}
        style={{ fontFamily: 'inherit' }}
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
        <HeaderDark />
      </div>
      <Avatar menu />
    </Space>
  );
};
export default GlobalHeaderRight;

import { Space } from 'antd';
import React from 'react';
import { SelectLang, useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar menu />
      {/* <SelectLang
        className={styles.action}
        postLocalesData={() => [
          {
            lang: 'zh-CN',
            label: '简体中文',
            icon: '🇨🇳',
            title: '语言',
          },
          {
            lang: 'zh-TW',
            label: '繁體中文',
            icon: '🇭🇰',
            title: '語言',
          },
          {
            lang: 'en-US',
            label: 'English',
            icon: '🇺🇸',
            title: 'Language',
          },
        ]}
      /> */}
    </Space>
  );
};
export default GlobalHeaderRight;

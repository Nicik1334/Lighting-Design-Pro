import { message, Switch } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import moon from './moon.svg';
import sun from './sun.svg';
import styles from './index.less';
import { THEME_DARK } from '@/constants';

export type ThemeType = 'light' | 'realDark';

const HeaderDark: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [checked, setChecked] = useState(initialState?.settings?.navTheme === 'realDark');
  if (!initialState || !initialState.settings) {
    return null;
  }
  return (
    <Switch
      className={styles.dark_Switch}
      checkedChildren={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={moon} />
        </div>
      }
      unCheckedChildren={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={sun} />
        </div>
      }
      checked={checked}
      onChange={async (e) => {
        setChecked(e);
        if (e) {
          message.loading({ content: '玩命切换中......', rtl: true, duration: 1 }).then(() => {
            sessionStorage.setItem(THEME_DARK, 'realDark' as ThemeType);
            setInitialState((preInitialState) => ({
              ...preInitialState,
              settings: { ...preInitialState?.settings, navTheme: 'realDark' },
            }));
          });
        } else {
          sessionStorage.setItem(THEME_DARK, 'light' as ThemeType);
          setInitialState((preInitialState) => ({
            ...preInitialState,
            settings: { ...preInitialState?.settings, navTheme: 'light' },
          }));
        }
      }}
    />
  );
};
export default HeaderDark;

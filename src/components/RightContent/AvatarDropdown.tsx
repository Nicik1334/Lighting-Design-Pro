import { LOGIN_PATH } from '@/constants';
import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Modal, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import React from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
const { confirm } = Modal;

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== LOGIN_PATH && !redirect) {
    history.replace({
      pathname: LOGIN_PATH,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) return loading;

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) return loading;

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <div onClick={() => history.push('/account/settings')}>个人设置</div>,
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: (
        <div
          onClick={() =>
            confirm({
              title: '确定信息',
              okText: '确定',
              cancelText: '取消',
              content: '确定注销当前登录状态？',
              onOk() {
                setInitialState((s) => ({ ...s, currentUser: undefined }));
                loginOut();
              },
            })
          }
        >
          退出登录
        </div>
      ),
    },
  ];

  return (
    <HeaderDropdown menu={{ items: menuItems }}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;

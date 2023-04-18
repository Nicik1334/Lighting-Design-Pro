import { USER_TOKEN } from '@/constants';
import {
  CopyOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, message, Modal, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useState } from 'react';
import { history, useModel, useDispatch } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import copy from 'copy-to-clipboard';
import styles from './index.less';
import Password from '../Password';

const { confirm } = Modal;
export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();
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
            key: 'password',
            label: (
              <a
                onClick={() => {
                  setOpen(true);
                }}
              >
                密码修改
              </a>
            ),
            icon: <SafetyCertificateOutlined />,
          },
          {
            key: 'copy',
            icon: <CopyOutlined />,
            label: (
              <div
                onClick={() => {
                  copy(sessionStorage.getItem(USER_TOKEN) as string);
                  message.success('复制成功');
                }}
              >
                复制Token
              </div>
            ),
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
                dispatch({ type: 'authModel/logout' });
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
    <div>
      <HeaderDropdown menu={{ items: menuItems }}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
      <Password open={open} onOpenChange={setOpen} onChange={() => {}} />
    </div>
  );
};

export default AvatarDropdown;

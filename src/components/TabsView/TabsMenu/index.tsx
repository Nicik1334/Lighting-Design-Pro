import {
  DownOutlined,
  FullscreenOutlined,
  HomeOutlined,
  ReloadOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useKeyPress } from 'ahooks';
import { Dropdown, Space, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import type { TagsItemType } from '../index';
import styles from './index.less';
interface IProps {
  /**
   * 菜单列表
   */
  tagList: TagsItemType[];
  /**
   * 选中key
   */
  activeKey: string;
  /**
   * 关闭当前标签
   */
  closePage: (tagVal: TagsItemType) => void;
  /**
   * 关闭所有标签
   */
  closeAllPage: () => void;
  /**
   * 关闭其他标签
   */
  closeOtherPage: () => void;
  /**
   * 刷新标签
   */
  refreshPage: (tagVal: TagsItemType) => void;
}

const TabsMenu: React.FC<IProps> = ({
  tagList,
  activeKey,
  closePage,
  closeAllPage,
  closeOtherPage,
  refreshPage,
}) => {
  const fullRef = useRef(null);
  const [isFull, setIsFull] = useState<boolean>(false);
  useKeyPress('esc', () => {
    setIsFull(false);
  });

  useEffect(() => {
    // console.log(tagList);
  }, [tagList]);

  return (
    <div
      className={`${styles.tags_wrapper} ${isFull ? styles.tabs_full : ''}`}
      ref={fullRef}
      style={{ background: isFull ? '#fff' : 'unset' }}
    >
      <Tabs
        hideAdd
        tabBarExtraContent={{
          right: (
            <Space style={{ marginRight: 24 }}>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: <div onClick={closeOtherPage}>关闭其他标签</div>,
                      key: '1',
                    },
                    {
                      label: <div onClick={closeAllPage}>关闭所有标签</div>,
                      key: '2',
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    关闭
                    <DownOutlined size={12} />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          ),
        }}
        activeKey={activeKey}
        size="small"
        type="editable-card"
        onEdit={(targetKey, action) => {
          console.log(targetKey);

          if (action === 'remove') {
            const tabItem = tagList.find((item) => item.path === targetKey);
            if (tabItem) closePage(tabItem);
          }
        }}
        items={tagList.map((item) => {
          return {
            label: (
              <div>
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: (
                          <Space align="center">
                            <ReloadOutlined style={{ fontSize: 12 }} />
                            <div>刷新</div>
                            <div
                              className={styles.drop_down_span}
                              onClick={() => refreshPage && refreshPage(item)}
                            />
                          </Space>
                        ),
                        key: '1',
                      },
                      {
                        label: (
                          <Space align="center">
                            <TagOutlined style={{ fontSize: 12 }} />
                            <div>关闭其他</div>
                            <div
                              className={styles.drop_down_span}
                              onClick={() => closeOtherPage && closeOtherPage()}
                            />
                          </Space>
                        ),
                        key: '2',
                      },
                      {
                        label: (
                          <Space align="center">
                            <HomeOutlined style={{ fontSize: 12 }} />
                            <div>关闭所有</div>
                            <div className={styles.drop_down_span} onClick={closeAllPage} />
                          </Space>
                        ),
                        key: '3',
                      },
                      {
                        label: (
                          <Space align="center">
                            <FullscreenOutlined style={{ fontSize: 12 }} />
                            <div>全屏</div>
                            <div
                              className={styles.drop_down_span}
                              onClick={() => setIsFull(true)}
                            />
                          </Space>
                        ),
                        key: '4',
                      },
                    ],
                  }}
                  trigger={['contextMenu']}
                >
                  <div onClick={() => history.push({ pathname: item.path, query: item.query })}>
                    {item.title}
                    <div className={styles.drop_down_span} />
                  </div>
                </Dropdown>
              </div>
            ),
            children: (
              <div
                style={
                  !isFull
                    ? { margin: '0 24px 24px' }
                    : {
                        background: '#fff',
                        margin: '0 24px 24px',
                      }
                }
              >
                <div
                  className={item.active ? 'animate__animated animate__fadeIn' : ''}
                  // style={!item.active ? { contentVisibility: 'auto' } : {}}
                  style={{ animationDuration: '.8s' }}
                >
                  {item.children}
                </div>
              </div>
            ),
            key: item.path,
          };
        })}
      />
    </div>
  );
};

export default TabsMenu;

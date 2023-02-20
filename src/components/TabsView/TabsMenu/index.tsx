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
  closeOtherPage: (tagVal: TagsItemType) => void;
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
  menuItem,
}) => {
  const [tagItem, setTagItem] = useState<TagsItemType>({} as any);
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
                      label: (
                        <div
                          onClick={() => {
                            closeOtherPage(tagItem);
                          }}
                        >
                          关闭其他标签
                        </div>
                      ),
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
                            <div onClick={() => refreshPage && refreshPage(item)}>刷新</div>
                          </Space>
                        ),
                        key: '1',
                      },
                      {
                        label: (
                          <Space align="center">
                            <TagOutlined style={{ fontSize: 12 }} />
                            <div onClick={() => closeOtherPage && closeOtherPage(item)}>
                              关闭其他
                            </div>
                          </Space>
                        ),
                        key: '2',
                      },
                      {
                        label: (
                          <Space align="center">
                            <HomeOutlined style={{ fontSize: 12 }} />
                            <div onClick={closeAllPage}>关闭所有</div>
                          </Space>
                        ),
                        key: '3',
                      },
                      {
                        label: (
                          <Space align="center">
                            <FullscreenOutlined style={{ fontSize: 12 }} />
                            <div onClick={() => setIsFull(true)}>全屏</div>
                          </Space>
                        ),
                        key: '4',
                      },
                    ],
                  }}
                  trigger={['contextMenu']}
                >
                  <div
                    onClick={() => {
                      history.push({ pathname: item.path, query: item.query });
                      setTagItem(item);
                    }}
                  >
                    {item.title}
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
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        margin: '0 24px 24px',
                      }
                }
              >
                <div>{item.children}</div>
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

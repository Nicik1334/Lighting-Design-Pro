import {
  DownOutlined,
  FullscreenOutlined,
  HomeOutlined,
  ReloadOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useKeyPress } from 'ahooks';
import type { TabsProps } from 'antd';
import { Dropdown, Space, Tabs } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { history } from 'umi';
import type { DraggableTabPaneProps, TabsMenuProps } from './data';
import styles from './index.less';

const type = 'DraggableTabNode';

const DraggableTabNode = ({ index, children, moveNode }: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return {
        isOver: monitor.isOver(),
        dropClassName: 'dropping',
      };
    },
    drop: (item: { index: React.Key }) => moveNode(item.index, index),
  });
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={isOver ? dropClassName : ''}>
      {children}
    </div>
  );
};

const TabsMenu: React.FC<TabsMenuProps> = ({
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

  const DraggableTabs: React.FC<TabsProps> = useCallback(
    (props: JSX.IntrinsicAttributes & TabsProps) => {
      const { items = [] } = props;
      const [order, setOrder] = useState<React.Key[]>([]);
      const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
        const newOrder = order.slice();
        items.forEach((item) => {
          if (item.key && newOrder.indexOf(item.key) === -1) {
            newOrder.push(item.key);
          }
        });
        const dragIndex = newOrder.indexOf(dragKey); // 移动的标签位置
        const hoverIndex = newOrder.indexOf(hoverKey); // 移动后标签位置
        newOrder.splice(dragIndex, 1); // 删除移动前标签
        newOrder.splice(hoverIndex, 0, dragKey); // 添加移动后标签
        setOrder(newOrder);
      };

      const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar: any) => {
        return (
          <DefaultTabBar {...tabBarProps}>
            {(node: any) => (
              <DraggableTabNode key={node.key} index={node.key!} moveNode={moveTabNode}>
                {node}
              </DraggableTabNode>
            )}
          </DefaultTabBar>
        );
      };
      const orderItems = [...items].sort((a, b) => {
        const orderA = order.indexOf(a.key!);
        const orderB = order.indexOf(b.key!);
        if (orderA !== -1 && orderB !== -1) return orderA - orderB;
        if (orderA !== -1) return -1;
        if (orderB !== -1) return 1;
        const ia = items.indexOf(a);
        const ib = items.indexOf(b);
        return ia - ib;
      });
      return (
        <DndProvider backend={HTML5Backend}>
          <Tabs renderTabBar={renderTabBar} {...props} items={orderItems} />
        </DndProvider>
      );
    },
    [],
  );

  return (
    <div
      className={`${styles.tags_wrapper} ${isFull ? styles.tabs_full : ''}`}
      ref={fullRef}
      style={{ background: isFull ? '#fff' : 'unset' }}
    >
      <DraggableTabs
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
        onEdit={(targetKey, action) => {
          if (action === 'remove') {
            const tabItem = tagList.find((item) => item.path === targetKey);
            if (tabItem) closePage(tabItem);
          }
        }}
        items={tagList.map((item): any => {
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
                  style={{ animationDuration: '.8s' }}
                  // style={!item.active ? { contentVisibility: 'auto' } : {}}
                >
                  {item.children}
                </div>
              </div>
            ),
            key: item.path,
          };
        })}
        activeKey={activeKey}
        size="small"
        type="editable-card"
      />
    </div>
  );
};

export default TabsMenu;

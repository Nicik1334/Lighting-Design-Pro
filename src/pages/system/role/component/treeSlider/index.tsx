import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, Space, Spin, Tag, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title: title as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

interface TreeSliderProps {
  loading: boolean;
  treeList: any;
}

const TreeSlider: React.FC<TreeSliderProps> = ({ loading, treeList, ...props }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  useEffect(() => {
    if (treeList) {
      generateList(treeList);
    }
  }, [treeList]);

  // 展开/收起节点时触发
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // 过滤菜单
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeList);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setAutoExpandParent(true);
  };

  return (
    <>
      <Checkbox.Group style={{ margin: '6px 0px 0' }}>
        <Checkbox
          checked={checkbox1}
          value="1"
          onChange={(e) => {
            if (!checkbox1) {
              const list = dataList.map((item) => item.key);
              setExpandedKeys(list as React.Key[]);
            } else {
              setExpandedKeys([]);
            }
            setAutoExpandParent(!checkbox1);
            setCheckbox1(!checkbox1);
          }}
        >
          展开/折叠
        </Checkbox>
        <Checkbox
          checked={checkbox2}
          value="2"
          onClick={() => {
            if (!checkbox2) {
              const list = dataList.map((item) => item.key);
              props?.onCheck(list);
            } else {
              props?.onCheck([]);
            }
            setCheckbox2(!checkbox2);
          }}
        >
          全选/全不选
        </Checkbox>
      </Checkbox.Group>
      <div className={styles.treeSlider}>
        {
          <Spin spinning={loading}>
            <Input
              style={{ marginBottom: 8 }}
              addonAfter={<SearchOutlined />}
              placeholder="过滤菜单"
              onChange={onChange}
            />
            <Tree
              {...props}
              checkable
              blockNode
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              titleRender={(item: any) => (
                <Space>
                  {item.nodeData.menuType === 2 ? ( // 按钮和url权限
                    <>
                      <Tag color="success">{item.nodeName}</Tag>
                      <div style={{ color: '#848587' }}>{`${item.nodeData.menuDesc}`}</div>
                    </>
                  ) : (
                    <div>{item.nodeName}</div>
                  )}
                </Space>
              )}
              treeData={treeList}
            />
          </Spin>
        }
      </div>
    </>
  );
};

export default TreeSlider;

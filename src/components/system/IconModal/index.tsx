import type { ModalProps } from 'antd';
import { Input } from 'antd';
import { Modal, Tooltip } from 'antd';
import Icon, { createFromIconfontCN, SearchOutlined } from '@ant-design/icons';
import * as antIcons from '@ant-design/icons';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ProCard } from '@ant-design/pro-components';
import { useCallback } from 'react';
import { DIYIconList } from './data';

interface IconModalProps extends ModalProps {
  onChange: (key: string) => void;
  cancel: (open: boolean) => void;
  open: boolean;
}

const defaultIcon = {
  Outlined: [],
  Filled: [],
  TwoTone: [],
  DIY: DIYIconList,
};

export const IconFont = createFromIconfontCN({
  scriptUrl: '/fontIcon.js', // 离线版
  // scriptUrl: '//at.alicdn.com/t/c/font_3950463_4e8682pkb7.js', // 在线版
});
const Index: FC<IconModalProps> = ({ onChange, cancel, open, ...restProps }) => {
  const [activeKey, setActiveKey] = useState('Outlined');
  const [outlinedList, setOutlinedList] = useState<string[]>([]);
  const [filledList, setFilledList] = useState<string[]>([]);
  const [twoToneList, setTwoToneList] = useState<string[]>([]);
  const [DIYList, setDIYList] = useState<string[]>([]);

  const antIconList = useCallback((iconType: string) => {
    const list = Object.keys(antIcons).filter(
      (item) => typeof antIcons[item] === 'object' && item.includes(iconType),
    );
    defaultIcon[iconType] = list;
    return list;
  }, []);

  useEffect(() => {
    setOutlinedList(antIconList('Outlined')); //线框风格
    setFilledList(antIconList('Filled')); //实底风格
    setTwoToneList(antIconList('TwoTone')); //双色风格
    setDIYList(DIYIconList); //双色风格
  }, []);

  const change = (e: any, key: string) => {
    const { value } = e.target;
    if (key === 'DIY') {
      setDIYList(defaultIcon[key].filter((item: string) => item.includes(value)));
      return;
    }
    const filterIcon = defaultIcon[key].filter((item: string) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
    switch (key) {
      case 'Outlined':
        setOutlinedList(filterIcon);
        break;
      case 'Filled':
        setFilledList(filterIcon);
        break;
      case 'TwoTone':
        setTwoToneList(filterIcon);
        break;
    }
  };

  const IconListDom = (list: string[], key: string) => (
    <>
      <Input
        style={{ marginBlock: 20 }}
        addonAfter={<SearchOutlined />}
        placeholder={'在此搜索图标'}
        onChange={(e) => change(e, key)}
      />
      <ul className={styles.iconList}>
        {list.map((item) => (
          <Tooltip placement="top" title={item} key={item} mouseEnterDelay={0.5}>
            <li className={styles.itemIcon} onClick={() => onChange(item)}>
              {key !== 'DIY' ? <Icon component={antIcons[item]} /> : <IconFont type={item} />}
            </li>
          </Tooltip>
        ))}
      </ul>
    </>
  );

  return (
    <Modal
      title="选择图标"
      className={styles.iconModal}
      width={880}
      open={open}
      footer={false}
      onCancel={() => cancel(false)}
      {...restProps}
    >
      <ProCard
        ghost={false}
        tabs={{
          activeKey,
          items: [
            {
              label: `线框风格`,
              key: 'Outlined',
              children: IconListDom(outlinedList, 'Outlined'),
            },
            {
              label: `实底风格`,
              key: 'Filled',
              children: IconListDom(filledList, 'Filled'),
            },
            {
              label: `双色风格`,
              key: 'TwoTone',
              children: IconListDom(twoToneList, 'TwoTone'),
            },
            {
              label: `DIY风格（需外网）`,
              key: 'DIY',
              children: IconListDom(DIYList, 'DIY'),
            },
          ],
          onChange: setActiveKey,
        }}
      />
    </Modal>
  );
};

export default Index;

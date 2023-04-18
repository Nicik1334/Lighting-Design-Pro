/* eslint-disable @typescript-eslint/no-shadow */
import Icon, {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EnterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import * as antIcons from '@ant-design/icons';
import { Input, Tag } from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { useModel } from 'umi';
import { IconFont } from '../IconModal';

interface ScarchProps {
  isShow: boolean;
  onEnter: (item: MenuType['nodeData']) => void;
}
const SearchModal: FC<ScarchProps> = ({ isShow = true, onEnter }) => {
  const [value, setValue] = useState('');
  const { initialState } = useModel<any>('@@initialState');
  const { currentUser } = initialState ?? {
    currentUser: { routes: [] },
  };

  const [routeList, setRouteList] = useState<MenuType['nodeData'][]>([]);
  const [menuList, setMenuList] = useState<MenuType['nodeData'][]>([]);
  const [actived, setActived] = useState<number>(-1);
  const listRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const handleScroll = (actived: number) => {
    let scrollTo = 0;
    if (actived !== -1) {
      scrollTo = listRef.current?.scrollTop || 0;
      const menuDomList = document.querySelectorAll(
        '#search_menu > .search_item',
      ) as unknown as HTMLDivElement[];

      // 搜索框视图滚动条距离顶部高度
      const searchScrollTop = listRef.current?.scrollTop;
      // 当前选中高度 70px
      const activedClientHeight = menuDomList[actived].clientHeight;

      // 当前选中距离顶部高度
      const activedOffsetTop = menuDomList[actived].offsetTop;
      // 搜索框视图高度 500px
      const searchClientHeight = listRef.current?.clientHeight || 0;

      if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight;
      } else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop;
      }
    }
    listRef.current?.scrollTo({ top: scrollTo });
  };

  const onKeyDown = ({ code }: { code: string }) => {
    if (menuList.length <= 0) return;
    switch (code) {
      case 'ArrowUp':
        setActived((pre) => {
          pre -= 1;
          if (pre < 0) pre = menuList.length - 1;
          handleScroll(pre);
          return pre;
        });
        break;
      case 'ArrowDown':
        setActived((pre) => {
          pre += 1;
          if (pre >= menuList.length) pre = 0;
          handleScroll(pre);
          return pre;
        });
        break;
      case 'Enter':
        onEnter(menuList[actived]);
        break;
    }
  };

  const onChange = (e: { target: { value: string } }) => {
    const val = e.target.value;
    setValue(val);
    if (val === '') {
      setMenuList(routeList);
    } else {
      setMenuList(() =>
        routeList.filter((item) => item.menuName.includes(val) || item.menuUrl.includes(val)),
      );
    }
  };

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      if (currentUser?.routes && currentUser?.routes.length > 0) {
        setRouteList(currentUser?.routes as any);
      }
    }
  }, [isShow]);

  useEffect(() => {
    if (currentUser?.routes && currentUser?.routes.length > 0) {
      setRouteList(currentUser?.routes as any);
      setMenuList(currentUser?.routes as any);
    }
  }, []);

  return (
    <div
      className={classNames(styles.search, {
        [styles.searching]: isShow,
      })}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <Input
            value={value}
            autoFocus
            ref={inputRef}
            prefix={<SearchOutlined />}
            placeholder="搜索页面，支持标题、URL模糊查询"
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
          <div className={styles.tips}>
            <div className={styles.tip}>
              <Tag color="default">Alt + S</Tag>
              <Tag color="default">唤醒搜索面板</Tag>
            </div>
            <div className={styles.tip}>
              <Tag>
                <ArrowUpOutlined />
              </Tag>
              <Tag>
                <ArrowDownOutlined />
              </Tag>
              <Tag>切换搜索结果</Tag>
            </div>
            <div className={styles.tip}>
              <Tag>
                <EnterOutlined />
              </Tag>
              <Tag>访问页面</Tag>
            </div>
            <div className={styles.tip}>
              <Tag>ESC</Tag>
              <Tag>退出</Tag>
            </div>
          </div>
        </div>
        <div className={classNames(styles.menuList)} id="search_menu" ref={listRef}>
          {menuList.map((item, i: number) => (
            <div
              key={item.menuCode}
              className={classNames(styles.listItem, 'search_item', {
                [styles.actived]: actived == i,
              })}
              onClick={() => onEnter(menuList[i])}
              onMouseOver={() => {
                setActived(i);
              }}
            >
              <div className={styles.icon}>
                {typeof item.icon === 'string' && item.icon.includes('icon') ? (
                  <IconFont type={item.icon} />
                ) : (
                  <Icon component={antIcons[item.icon || 'SmileOutlined']} />
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.title}>{item.menuName}</div>
                <div className={styles.path}>{item.menuUrl}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchModal;

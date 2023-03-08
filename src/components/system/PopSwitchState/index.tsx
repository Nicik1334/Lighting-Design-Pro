import type { PopconfirmProps, SwitchProps } from 'antd';
import { Popconfirm, Switch } from 'antd';
import type { FC } from 'react';

interface PopStateType {
  title: PopconfirmProps['title'];
  checked: SwitchProps['checked'];
  onConfirm: PopconfirmProps['onConfirm'];
  popconfirmProps?: PopconfirmProps;
  SwitchProps?: SwitchProps;
}
const Index: FC<PopStateType> = ({ popconfirmProps, SwitchProps, title, checked, onConfirm }) => {
  return (
    <div>
      <Popconfirm
        placement="topRight"
        okText="确定"
        cancelText="取消"
        {...popconfirmProps}
        title={title}
        onConfirm={onConfirm}
      >
        <Switch
          unCheckedChildren="禁用"
          checkedChildren="启用"
          {...SwitchProps}
          checked={checked}
        />
      </Popconfirm>
    </div>
  );
};
export default Index;

import type { PopconfirmProps, SwitchProps } from 'antd';
import { Popconfirm, Switch, Tag } from 'antd';
import type { FC } from 'react';

interface PopStateType {
  checked: SwitchProps['checked'];
  onConfirm: PopconfirmProps['onConfirm'];
  loading?: boolean;
  popconfirmProps?: PopconfirmProps;
  SwitchProps?: SwitchProps;
  valueName: string;
  checkedTitle?: string;
  unCheckedTitle?: string;
}
const Index: FC<PopStateType> = ({
  popconfirmProps,
  valueName,
  SwitchProps,
  checked,
  loading,
  checkedTitle = '启用',
  unCheckedTitle = '禁用',
  onConfirm,
}) => {
  return (
    <div>
      <Popconfirm
        placement="topRight"
        okText="确定"
        cancelText="取消"
        title={
          <>
            您确定
            {checked ? (
              <Tag color="red" style={{ marginLeft: 8 }}>
                {unCheckedTitle}
              </Tag>
            ) : (
              <Tag color="success" style={{ marginLeft: 8 }}>
                {checkedTitle}
              </Tag>
            )}
            <Tag color="default">{valueName}</Tag>
            吗？
          </>
        }
        {...popconfirmProps}
        onConfirm={onConfirm}
      >
        <Switch
          unCheckedChildren={unCheckedTitle}
          checkedChildren={checkedTitle}
          loading={loading}
          {...SwitchProps}
          checked={checked}
        />
      </Popconfirm>
    </div>
  );
};
export default Index;

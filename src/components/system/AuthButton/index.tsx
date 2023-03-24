import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import { useModel, useAccess } from 'umi';

interface AuthButtonProps extends ButtonProps {
  /**
   * 权限标识
   */
  auth?: string;
}

/**
 * 带权限的按钮组件、继承Ant Button所有属性
 * @param AuthButtonProps
 * @returns auth为`undefined`，则默认为普通Button
 */
const AuthButton: React.FC<AuthButtonProps> = ({ auth, children, ...props }) => {
  const { initialState } = useModel('@@initialState');
  const access = useAccess();

  const { currentUser } = initialState as { currentUser: API.CurrentUser };
  const [flag] = useState<boolean>(() =>
    auth !== undefined
      ? !!(currentUser?.authButton && currentUser.authButton?.find((item) => item === auth))
      : true,
  );
  return <>{flag ? <Button {...props}>{children}</Button> : <></>}</>;
};

export default AuthButton;

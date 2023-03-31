import screenBg from '@/assets/bg.png';
import styles from './index.less';
import { history } from 'umi';
import { useContext } from 'react';
import { BaseTabsContext } from '@/layouts/BaseTabs';

const Index = () => {
  const { handleClosePage } = useContext(BaseTabsContext);

  return (
    <div className={styles.data_screen}>
      <img src={screenBg} alt="" className={styles.data_img} />
      <div
        className={styles.home_button}
        onClick={async () => {
          handleClosePage({
            path: '/dataScreen',
          });
          history.replace('/dashboard');
        }}
      />
    </div>
  );
};
export default Index;

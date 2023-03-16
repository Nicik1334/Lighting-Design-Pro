import screenBg from '@/assets/bg.png';
import styles from './index.less';
import { history } from 'umi';
import { useContext } from 'react';
import { TagViewContext } from '@/components/common/TabsView';

const Index = () => {
  const { handleClosePage } = useContext(TagViewContext);

  return (
    <div className={styles.data_screen}>
      <img src={screenBg} alt="" className={styles.data_img} />
      <div
        className={styles.home_button}
        onClick={async () => {
          history.replace('/dashboard');
          setTimeout(() => {
            handleClosePage({
              path: '/dataScreen',
            });
          }, 100);
        }}
      />
    </div>
  );
};
export default Index;

import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

const Index = () => {
  return (
    <PageContainer>
      <Card>
        <p>菜单menu1</p>
        <p style={{ textIndent: '2em' }}>菜单menu1-2</p>
        <p style={{ textIndent: '4em' }}>菜单menu1-2-2</p>
      </Card>
    </PageContainer>
  );
};
export default Index;

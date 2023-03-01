import { Col, Row } from 'antd';
import type { FC } from 'react';
import { createContext, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { DictionaryItemType } from './interface';
import LabelList from './component/labelList';
import ValueList from './component/valueList';

interface DicContextProps {
  record: DictionaryItemType | undefined;
  setRecord: (val: DictionaryItemType | undefined) => void;
}

export const DicContext = createContext<DicContextProps>({
  record: undefined,
  setRecord: () => {},
});

const Dictionary: FC = () => {
  const [record, setRecord] = useState<DictionaryItemType>();
  return (
    <PageContainer>
      <DicContext.Provider
        value={{
          record,
          setRecord,
        }}
      >
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <LabelList />
          </Col>
          <Col span={12}>
            <ValueList />
          </Col>
        </Row>
      </DicContext.Provider>
    </PageContainer>
  );
};

export default Dictionary;

import { LNumberRoll } from 'lighting-design';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

export type TimeRollProps = {
  className?: string;
  format?: string;
};

const TimeRoll: React.FC<TimeRollProps> = ({ className, format }) => {
  const [value, setValue] = useState<string>(moment(new Date()).format(format));

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(moment(new Date()).format(format));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [format]);

  return (
    <div className={className}>
      <LNumberRoll type="date" className={styles.numberStyle} value={value} />
    </div>
  );
};

export default TimeRoll;

import { useState } from 'react';
import MonthCalendar from '../UI/MonthCalendar';

const YasumiRegistry = (maxYasumi) => {
  const [remainingYasumi, setRemainingYasumi] = useState(maxYasumi);
  const clickDayHandler = (el) => {
    console.log(el);
  };

  return <MonthCalendar {...{ clickDayHandler }} />;
};

export default YasumiRegistry;

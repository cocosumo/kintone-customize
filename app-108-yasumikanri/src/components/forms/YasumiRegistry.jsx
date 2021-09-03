import { useEffect, useState, useRef } from 'react';
import { Container } from '@material-ui/core';
import MonthCalendar from '../UI/MonthCalendar';
import { JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';
import { yasumiRecToObj, yasumiUsed } from '../../backend/yasumiKanri';

const YasumiRegistry = () => {
  const [remainingYasumi, setRemainingYasumi] = useState();
  const [yasumiRecords, setYasumiRecords] = useState();
  const currentMonth = useRef();

  const clickDayHandler = (info) => {
    const { dateStr } = info;
    const dateRecords = yasumiRecords[dateStr];
    const record = dateRecords.find(({ type }) => type === 'day-ordinary');
    if (record) {
      console.log(record);
    }
  };

  const datesSetHandler = async ({ view }) => {
    const { currentStart } = view;
    currentMonth.current = JSDToLux(currentStart);

    setYasumiRecords(await yasumiRecToObj(currentMonth.current));
  };

  useEffect(async () => {
    if (yasumiRecords) {
      setRemainingYasumi(
        await getYasumiCount(currentMonth.current) - yasumiUsed(yasumiRecords),
      );
    }
  }, [yasumiRecords]);

  return (
    <Container maxWidth="sm">
      <MonthCalendar {...{
        remainingYasumi,
        datesSetHandler,
        clickDayHandler,
        yasumiRecords,
      }}
      />
    </Container>
  );
};

export default YasumiRegistry;

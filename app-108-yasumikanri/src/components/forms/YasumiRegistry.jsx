import {
  useEffect, useState, useRef,
} from 'react';
import { Container } from '@material-ui/core';
import MonthCalendar from '../UI/MonthCalendar';
import { JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';
import { yasumiUsed } from '../../backend/yasumiKanri';
import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';

const YasumiRegistry = () => {
  const [remainingYasumi, setRemainingYasumi] = useState();
  const [yasumiRecords, setYasumiRecords] = useState();
  const [savedRecords, setSavedRecords] = useState();
  const currentMonth = useRef();

  const clickDayHandler = (info) => {
    yasumiChangeHandler({
      info,
      yasumiRecords,
      remainingYasumi,
      savedRecords,
      currentMonth,
      setYasumiRecords,
      setSavedRecords,
    });
  };

  const datesSetHandler = async ({ view }) => {
    const { currentStart } = view;
    currentMonth.current = JSDToLux(currentStart);
    refetchData({
      currentMonth,
      setYasumiRecords,
      setSavedRecords,
    });
    /*  const yasumiObjs = await yasumiRecToObj(currentMonth.current);
    setYasumiRecords(yasumiObjs);
    setSavedRecords(yasumiObjs); */
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

import { useState, useRef } from 'react';
import { Container } from '@mui/material';
import MonthCalendar from '../UI/MonthCalendar';
import { ISOtoLux, isWithinMonth, JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';

import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';
import deleteExcessYasumi from '../../handlers/deleteExcessYasumi';
import SimpleSnackbar from '../UI/snackbars/SimpleSnackBar';

const YasumiRegistry = () => {
  const [yasumiRecords, setYasumiRecords] = useState();
  const [snackType, setSnackType] = useState();
  const [snackOpen, setSnackOpen] = useState(false);
  const [remainingYasumi, setRemainingYasumi] = useState();
  const [savedRecords, setSavedRecords] = useState();
  const currentMonth = useRef();
  const maxYasumi = useRef(0);

  const clickDayHandler = (info) => {
    if (isWithinMonth(currentMonth.current, ISOtoLux(info.dateStr))) {
      yasumiChangeHandler({
        info,
        yasumiRecords,
        savedRecords,
        currentMonth,
        maxYasumi,
        remainingYasumi,
        setRemainingYasumi,
        setYasumiRecords,
        setSavedRecords,
        setSnackType,
        setSnackOpen,
      });
    }
  };

  const datesSetHandler = async ({ view }) => {
    const { currentStart } = view;
    currentMonth.current = JSDToLux(currentStart);
    maxYasumi.current = await getYasumiCount(currentMonth.current);
    refetchData({
      currentMonth,
      maxYasumi,
      setSavedRecords,
      setYasumiRecords,
      setRemainingYasumi,
    });
  };

  deleteExcessYasumi({
    remainingYasumi,
    yasumiRecords,
    currentMonth,
    maxYasumi,
    setSavedRecords,
    setYasumiRecords,
    setRemainingYasumi,
    setSnackType,
    setSnackOpen,
  });

  return (
    <Container maxWidth="md">
      <MonthCalendar
        {...{
          currentMonth,
          remainingYasumi,
          datesSetHandler,
          clickDayHandler,
          yasumiRecords,
        }}
      />

      <SimpleSnackbar open={snackOpen} setSnackOpen={setSnackOpen} snackType={snackType} />
    </Container>
  );
};

export default YasumiRegistry;

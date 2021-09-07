import { useState, useRef } from 'react';
import { Container } from '@mui/material';
import MonthCalendar from '../UI/MonthCalendar';
import { ISOtoLux, isWithinMonth, JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';

import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';
import deleteExcessYasumi from '../../handlers/deleteExcessYasumi';
import SimpleSnackbar from '../UI/snackbars/SimpleSnackBar';
import clearYasumi from '../../handlers/clearYasumi';
import LeaveSnackBar from '../UI/snackbars/LeaveSnackbar';

const YasumiRegistry = () => {
  const [yasumiRecords, setYasumiRecords] = useState();
  const [snackType, setSnackType] = useState();
  const [snackOpen, setSnackOpen] = useState(false);
  const [leaveSnackOpen, setLeaveSnackOpen] = useState(false);
  const [remainingYasumi, setRemainingYasumi] = useState();
  const [savedRecords, setSavedRecords] = useState();
  const [isSaving, setIsSaving] = useState();
  const currentMonth = useRef();
  const maxYasumi = useRef(0);

  const clickDayHandler = (info) => {
    if (!isSaving && isWithinMonth(currentMonth.current, ISOtoLux(info.dateStr))) {
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
        setIsSaving,
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

  const clearHandler = () => {
    clearYasumi({
      yasumiRecords,
      currentMonth,
      maxYasumi,
      setSavedRecords,
      setYasumiRecords,
      setRemainingYasumi,
      setSnackType,
      setSnackOpen,
      setIsSaving,
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
          isSaving,
          clearHandler,
        }}
      />

      <SimpleSnackbar open={snackOpen} setSnackOpen={setSnackOpen} snackType={snackType} />
      <LeaveSnackBar
        open={leaveSnackOpen}
        setLeaveSnackOpen={setLeaveSnackOpen}
        data={data}
      />
    </Container>
  );
};

export default YasumiRegistry;

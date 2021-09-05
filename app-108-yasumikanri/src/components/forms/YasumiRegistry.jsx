import {
  useEffect, useState, useRef,
} from 'react';
import { Container } from '@mui/material';
import MonthCalendar from '../UI/MonthCalendar';
import { JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';
import { yasumiUsed } from '../../backend/yasumiKanri';
import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';
import AboveLimit from '../UI/snackbars/AboveLimit';
import SavedSnack from '../UI/snackbars/Saved';
import WarningSnack from '../UI/snackbars/ServerWaning';
import deleteExcessYasumi from '../../handlers/deleteExcessYasumi';

const YasumiRegistry = () => {
  const [yasumiRecords, setYasumiRecords] = useState();
  // const [savedRecords, setSavedRecords] = useState();

  /*   const [errorSnackOpen, setErrorSnackOpen] = useState();
  const [savedSnackOpen, setSavedSnackOpen] = useState();
  const [warningSnackOpen, setWarningSnackOpen] = useState(); */

  const [snackType, setSnackType] = useState();

  const [remainingYasumi, setRemainingYasumi] = useState();
  const currentMonth = useRef();
  const maxYasumi = useRef(0);
  // const remainingYasumi = useRef(0);
  const savedRecords = useRef();

  const clickDayHandler = (info) => {
    yasumiChangeHandler({
      info,
      yasumiRecords,
      savedRecords,
      currentMonth,
      maxYasumi,
      remainingYasumi,
      setRemainingYasumi,
      setYasumiRecords,
      setSnackType,
      // setErrorSnackOpen,
      // setSavedSnackOpen,
      // setWarningSnackOpen,
    });
  };

  const datesSetHandler = async ({ view }) => {
    const { currentStart } = view;
    currentMonth.current = JSDToLux(currentStart);
    maxYasumi.current = await getYasumiCount(currentMonth.current);

    refetchData({
      currentMonth,
      maxYasumi,
      savedRecords,
      setYasumiRecords,
      setRemainingYasumi,
    });
  };

  console.log('rerendered');

  /*   useEffect(async () => {
    if (yasumiRecords) {
      remainingYasumi.current = maxYasumi.current - yasumiUsed(yasumiRecords);
    }
  }, [yasumiRecords]); */

  deleteExcessYasumi({
    remainingYasumi,
    yasumiRecords,
    currentMonth,
    savedRecords,
    setYasumiRecords,
    setRemainingYasumi,
    maxYasumi,
  });

  return (
    <Container maxWidth="md">
      <MonthCalendar {...{
        remainingYasumi,
        datesSetHandler,
        clickDayHandler,
        yasumiRecords,
      }}
      />
      <ErrorSnack open={errorSnackOpen} onClose={setErrorSnackOpen} />
      <SavedSnack open={savedSnackOpen} onClose={setSavedSnackOpen} />
      <WarningSnack open={warningSnackOpen} onClose={setWarningSnackOpen} />

    </Container>
  );
};

export default YasumiRegistry;

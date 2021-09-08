import { useState, useRef } from 'react';
import { Container, Button, Grid } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import MonthCalendar from '../UI/MonthCalendar';
import { ISOtoLux, isWithinMonth, JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';

import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';
import deleteExcessYasumi from '../../handlers/deleteExcessYasumi';
import SimpleSnackbar from '../UI/snackbars/SimpleSnackBar';
import clearYasumi from '../../handlers/clearYasumi';
import LeaveSnackBar from '../UI/snackbars/LeaveSnackbar';
import getLeaveInClickedDate from '../../handlers/getLeaveInClickedDate';
import Instructions from '../paragraphs/Instructions';

const YasumiRegistry = () => {
  const [yasumiRecords, setYasumiRecords] = useState();
  const [snackType, setSnackType] = useState();
  const [snackOpen, setSnackOpen] = useState(false);
  const [leaveSnack, setLeaveSnack] = useState({ isOpen: false, data: [], date: '' });
  const [remainingYasumi, setRemainingYasumi] = useState();
  const [savedRecords, setSavedRecords] = useState();
  const [isSaving, setIsSaving] = useState();
  const [isEditing, seIsEditing] = useState(false);
  const currentMonth = useRef();
  const maxYasumi = useRef(0);

  const clickDayHandler = (info) => {
    if (!isSaving && isWithinMonth(currentMonth.current, ISOtoLux(info.dateStr))) {
      const leaveInClickedDate = getLeaveInClickedDate(yasumiRecords[info.dateStr]);
      if (leaveInClickedDate) {
        setLeaveSnack({
          isOpen: true,
          data: leaveInClickedDate,
          date: info.dateStr,
        });
      }

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
        seIsEditing,
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
    <>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          alignItems="center"
          marginBottom={2}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HelpIcon />}
            onClick={() => {
              const element = document.getElementById('helpSection');
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            使い方
          </Button>
        </Grid>
        <MonthCalendar
          {...{
            currentMonth,
            remainingYasumi,
            datesSetHandler,
            clickDayHandler,
            yasumiRecords,
            isEditing,
            clearHandler,
          }}
        />

        <SimpleSnackbar open={snackOpen} setSnackOpen={setSnackOpen} snackType={snackType} />
        <LeaveSnackBar {...{ leaveSnack, setLeaveSnack }} />
        <Instructions />
      </Container>
    </>
  );
};

export default YasumiRegistry;

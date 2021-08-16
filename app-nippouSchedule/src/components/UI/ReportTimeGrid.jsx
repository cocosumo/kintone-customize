import { useState } from 'react';
import TimeGrid from './TimeGrid';
import { onFieldChange } from '../../../../kintone-api/api';
import eventInput from '../modals/eventInput';

const ReportTimeGrid = () => {
  const [reportDate, setReportDate] = useState();

  const onDateChangeHandler = ({ record }) => {
    const rd = record.reportDate.value;
    setReportDate(rd);
  };
  const bindToDate = () => {
    kintone.events.on(onFieldChange('reportDate'), onDateChangeHandler);
  };
  const onTimeSelected = (info) => {
    // showModal
    eventInput(info);
  };

  return (
    <TimeGrid
      selectedDate={reportDate}
      didMountHandler={bindToDate}
      onClickDateHandler={onTimeSelected}
    />
  );
};

export default ReportTimeGrid;

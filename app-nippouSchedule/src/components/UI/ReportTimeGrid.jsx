import { useState } from 'react';
import TimeGrid from './TimeGrid';
import { onFieldChange } from '../../../../kintone-api/api';
import showInputModal from '../modals/showInputModal';

const ReportTimeGrid = () => {
  const [reportDate, setReportDate] = useState();
  const [events, setEvents] = useState([]);

  const onDateChangeHandler = ({ record }) => {
    const rd = record.reportDate.value;
    setReportDate(rd);
  };

  const bindToDate = () => {
    kintone.events.on(onFieldChange('reportDate'), onDateChangeHandler);
  };

  const onTimeSelected = async (info) => {
    // showModal
    const inputModal = await showInputModal(info);
    const { value: newEvent, isConfirmed } = inputModal;
    console.log(isConfirmed);
    setEvents([...events, newEvent]);
  };

  return (
    <TimeGrid
      selectedDate={reportDate}
      didMountHandler={bindToDate}
      onClickDateHandler={onTimeSelected}
      events={events}
    />
  );
};

export default ReportTimeGrid;

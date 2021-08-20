import { useContext, useState } from 'react';
import TimeGrid from './TimeGrid';
import { onFieldChange } from '../../../../kintone-api/api';
import showInputModal from '../modals/showInputModal';
import { EventsContext } from '../context/EventsProvider';
import { deleteEventById, replaceEvent } from '../../helpers/DOM';

const Report = () => {
  const [reportDate, setReportDate] = useState();
  const [allEvents, setAllEvents] = useContext(EventsContext);
  const onDateChangeHandler = ({ record }) => {
    const rd = record.reportDate.value;
    setReportDate(rd);
  };

  const bindToDate = () => {
    kintone.events.on(onFieldChange('reportDate'), onDateChangeHandler);
  };

  const onClickDateHandler = async (info, isEventClicked) => {
    const inputModal = await showInputModal(info);
    const { value: newEvent, isConfirmed } = inputModal;

    if (isConfirmed) {
      if (isEventClicked) {
        const modifiedEvents = replaceEvent(allEvents, newEvent, info.id);
        setAllEvents(modifiedEvents);
      } else {
        setAllEvents(allEvents.concat(newEvent));
      }
    }
  };

  const onClickEventHandler = (info, isEventClicked) => {
    onClickDateHandler(info.event, isEventClicked);
  };
  const eventResizeHandler = (info) => {
    console.log(info.oldEvent.id);
  };

  return (
    <TimeGrid
      selectedDate={reportDate}
      didMountHandler={bindToDate}
      onClickDate={(info) => onClickDateHandler(info, false)}
      onClickEvent={(info) => onClickEventHandler(info, true)}
      eventResize={eventResizeHandler}
      events={allEvents}
    />
  );
};

export default Report;

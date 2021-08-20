import { useContext, useState } from 'react';
import TimeGrid from './TimeGrid';
import { onFieldChange } from '../../../../kintone-api/api';
import showInputModal from '../modals/showInputModal';
import { EventsContext } from '../context/EventsProvider';
import { replaceEvent, timeTo24Format } from '../../helpers/DOM';

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

  const eventChangeHandler = (info) => {
    const startTime = timeTo24Format(info.event.startStr);
    const endTime = timeTo24Format(info.event.endStr);
    const eventTitle = info.event.title;
    const buildIdString = (eventTitle + startTime + endTime).replace(/:/g, '');
    const oldEventId = info.oldEvent.id;

    const newEvent = {
      id: buildIdString,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      backgroundColor: info.event.backgroundColor,
      textColor: info.event.textColor,
      description: info.event.description,
      editable: true,
    };

    const modifiedEvents = replaceEvent(allEvents, newEvent, oldEventId);

    setAllEvents(modifiedEvents);
  };

  return (
    <TimeGrid
      selectedDate={reportDate}
      didMountHandler={bindToDate}
      onClickDate={(info) => onClickDateHandler(info, false)}
      onClickEvent={(info) => onClickEventHandler(info, true)}
      eventChange={eventChangeHandler}
      events={allEvents}
    />
  );
};

export default Report;

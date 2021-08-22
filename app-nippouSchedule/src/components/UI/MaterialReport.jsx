import { useContext, useState } from 'react';
import TimeGrid from './TimeGrid';
import { onFieldChange } from '../../../../kintone-api/api';
import { EventsContext } from '../context/EventsProvider';
import { deleteEventById, replaceEvent } from '../../helpers/DOM';
import { timeTo24Format } from '../../helpers/Time';
import MaterialEventInput from '../modals/MaterialEventInput';
import actionTypeData from '../../static/actionTypeData';

const MaterialReport = ({ selectedDate }) => {
  const [reportDate, setReportDate] = useState(selectedDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [allEvents, setAllEvents] = useContext(EventsContext);

  const onDateChangeHandler = ({ record }) => {
    const rd = record.reportDate.value;
    setReportDate(rd);
  };

  const bindToDate = () => {
    kintone.events.on(onFieldChange('reportDate'), onDateChangeHandler);
  };

  /*   const onConfirmEventInputHandler = (info, newEvent, isEventClicked) => {
    if (isEventClicked) {
      const modifiedEvents = replaceEvent(allEvents, newEvent, info.id);
      setAllEvents(modifiedEvents);
    } else {
      setAllEvents(allEvents.concat(newEvent));
    }
  }; */

  const onClickDateHandler = async (info) => {
    setSelectedTime(info);
    setIsFormOpen(true);
  };

  const onClickEventHandler = (info, isEventClicked) => {
    onClickDateHandler(info.event, isEventClicked);
  };

  const eventChangeHandler = (info) => {
    const startTime = timeTo24Format(info.startTime || info.event.startStr);
    const endTime = timeTo24Format(info.endTime || info.event.endStr);
    const eventTitle = info.actionType || info.event.title;
    const buildIdString = (eventTitle + startTime + endTime).replace(/:/g, '');
    const oldEventId = info.id || info.oldEvent?.id;
    const colorData = actionTypeData().find(({ type }) => type === eventTitle);
    const { bgColor, color } = colorData;

    const newEvent = {
      id: buildIdString,
      title: eventTitle,
      start: info.startTime?.toJSDate().toISOString() || info.event.startStr,
      end: info.endTime?.toJSDate().toISOString() || info.event.endStr,
      backgroundColor: bgColor,
      textColor: color,
      description: info.actionDetails || info.event?.extendedProps.description,
      editable: true,
    };

    if (oldEventId) {
      const modifiedEvents = replaceEvent(allEvents, newEvent, oldEventId);
      setAllEvents(modifiedEvents);
    } else {
      setAllEvents(allEvents.concat(newEvent));
    }
  };

  const deleteEventHandler = (id) => {
    const reducedEvents = deleteEventById(allEvents, id);
    console.log(reducedEvents, id);
    setAllEvents(reducedEvents);
  };

  const onFormCloseHandler = ({ closeMethod, data }) => {
    switch (closeMethod) {
      case 'save':
        eventChangeHandler(data);
        break;
      case 'delete':
        deleteEventHandler(data.id);
        break;
      default:
        break;
    }
    setIsFormOpen(false);
  };

  return (
    <>
      <TimeGrid
        selectedDate={reportDate}
        didMountHandler={bindToDate}
        onClickDate={(info) => onClickDateHandler(info, false)}
        onClickEvent={(info) => onClickEventHandler(info, true)}
        eventChange={eventChangeHandler}
        events={allEvents}
      />
      {isFormOpen && (
      <MaterialEventInput
        open={isFormOpen}
        onFormClose={onFormCloseHandler}
        selectedTime={selectedTime}
        optionsData={actionTypeData()}
      />
      )}
    </>
  );
};

export default MaterialReport;

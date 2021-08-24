import { useContext, useState } from 'react';
import TimeGrid from './TimeGrid';
import { onFieldChange } from '../../../../kintone-api/api';
import { EventsContext } from '../context/EventsProvider';
import { deleteEventById, replaceEvent, scrollTo } from '../../helpers/DOM';
import { isPast, timeTo24Format } from '../../helpers/Time';
// import EventEditDialog from '../modals/EventEditDialog';
import EventDetailsDialog from '../modals/EventDetailsDialog';
import actionTypeData from '../../static/actionTypeData';
import Title from './Title';

const MaterialReport = ({ selectedDate }) => {
  const [reportDate, setReportDate] = useState(selectedDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [pageY, setPageY] = useState();
  const [allEvents, setAllEvents] = useContext(EventsContext);

  const scheduleType = isPast(reportDate) ? '当日何をしましたか。' : '予定を登録しますね。';

  const onDateChangeHandler = ({ record }) => {
    const rd = record.reportDate.value;
    setReportDate(rd);
  };

  const bindToDate = () => {
    kintone.events.on(onFieldChange('reportDate'), onDateChangeHandler);
  };

  const onClickDateHandler = async (info) => {
    setSelectedTime(info);
    setIsFormOpen(true);
    setPageY(window.pageYOffset);
  };

  const onClickEventHandler = (info) => {
    onClickDateHandler(info.event);
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

    setAllEvents(reducedEvents);
  };

  const onFormCloseHandler = ({ closeMethod, data }) => {
    scrollTo(pageY);
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
      <Title>{scheduleType}</Title>
      <TimeGrid
        selectedDate={reportDate}
        didMountHandler={bindToDate}
        onClickDate={(info) => onClickDateHandler(info)}
        onClickEvent={(info) => onClickEventHandler(info)}
        eventChange={eventChangeHandler}
        events={allEvents}
      />
      {isFormOpen
      && (
      <EventDetailsDialog
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

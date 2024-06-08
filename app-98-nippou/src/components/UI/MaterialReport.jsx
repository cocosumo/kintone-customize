import {useContext, useState, useRef} from 'react';
import TimeGrid from './TimeGrid';
import {onFieldChange} from '../../../../kintone-api/api';
import {EventsContext} from '../../store/EventsProvider';
import {deleteEventById, replaceEvent, scrollTo} from '../../helpers/DOM';
import {timeTo24Format} from '../../helpers/Time';

import EventEditDialog from './../modals/EventEditDialog';
import {EventDetailsPopper} from '../poppers/EventDetailsPopper';
import {getActionTypeData} from '../../backend/fetchSettings';

const MaterialReport = ({selectedDate, actionOptions}) => {
  const [reportDate, setReportDate] = useState(selectedDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [pageY, setPageY] = useState();
  const [allEvents, setAllEvents] = useContext(EventsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const clickedEventId = useRef(null);

  // const scheduleType = isPast(reportDate) ? '当日何をしましたか。' : '予定を登録しますね。';

  const onDateChangeHandler = ({record}) => {
    const rd = record.reportDate.value;
    setReportDate(rd);
  };

  const bindToDate = () => {
    kintone.events.on(onFieldChange('reportDate'), onDateChangeHandler);
  };

  const onClickCalendarHandler = async (info) => {
    setSelectedTime(info);
    setPageY(window.pageYOffset);
  };

  const onClickTimeHandler = async (info) => {
    setIsDetailsOpen(false);
    onClickCalendarHandler(info);
    setIsFormOpen(true);
  };

  const onClickEventHandler = () => (info) => {
    setAnchorEl(info.el);
    onClickCalendarHandler(info.event);
    setIsDetailsOpen((prev) => {
      if (prev && clickedEventId.current === info.event.id) {
        return false;
      }
      clickedEventId.current = info.event.id;
      return true;
    });
  };

  const eventChangeHandler = (info) => {
    const startTime = timeTo24Format(info.startTime || info.event.startStr);
    const endTime = timeTo24Format(info.endTime || info.event.endStr);
    const eventTitle = info.actionType || info.event.title;
    const buildIdString = (eventTitle + startTime + endTime).replace(/:/g, '');
    const oldEventId = info.id || info.oldEvent?.id;
    const colorDate = getActionTypeData(eventTitle);

    const {bgColor, color} = colorDate;

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

    setIsDetailsOpen(false);
  };

  const deleteEventHandler = (id) => {
    const reducedEvents = deleteEventById(allEvents, id);

    setAllEvents(reducedEvents);
  };

  const onFormCloseHandler = ({closeMethod, data}) => {
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

  const onDetailsCloseHandler = ({closeMethod, data}) => {
    switch (closeMethod) {
      case 'delete':
        deleteEventHandler(data.id);
        break;
      case 'edit':
        onClickTimeHandler(selectedTime);
        break;
      default:
        break;
    }

    setIsDetailsOpen(false);
  };

  return (
    <>
      {isDetailsOpen && (
        <EventDetailsPopper
          id="eventDetails"
          open={isDetailsOpen}
          anchorEl={anchorEl}
          onDetailsClose={onDetailsCloseHandler}
          selectedTime={selectedTime}
        />
      )}
      <TimeGrid
        selectedDate={reportDate}
        didMountHandler={bindToDate}
        onClickTime={(info) => onClickTimeHandler(info)}
        onClickEvent={onClickEventHandler('left')}
        eventChange={eventChangeHandler}
        events={allEvents}
      />
      {isFormOpen
      && (
        <EventEditDialog
          open={isFormOpen}
          onFormClose={onFormCloseHandler}
          selectedTime={selectedTime}
        />
      )}

    </>
  );
};

export default MaterialReport;

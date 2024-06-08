/* eslint-disable react/jsx-boolean-value */
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import './TimeGrid.css';

const TimeGrid = ({
  selectedDate,
  didMountHandler,
  onClickTime,
  onClickEvent,
  eventChange,
  events,
}) => (
  <FullCalendar
    locale={jaLocale}
    plugins={[timeGridPlugin, interactionPlugin]}
    initialView="timeGridDay"
    initialDate={selectedDate}
    slotMinTime="07:30:00"
    slotMaxTime="23:00:00"
    validRange={{
      start: selectedDate,
      end: selectedDate,
    }}
    headerToolbar={false}
    dayHeaders={false}
    height="auto"
    viewDidMount={didMountHandler}
    selectable={true}
    select={onClickTime}
    eventResize={eventChange}
    eventDrop={eventChange}
    events={events}
    eventClick={onClickEvent}
    longPressDelay={100}
    eventLongPressDelay={1000}
    businessHours={{
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      startTime: '7:00',
      endTime: '23:00',
    }}
    eventConstraint="businessHours"
    selectConstraint="businessHours"
    eventBorderColor="white"
    forceEventDuration={true}
  />
);
export default TimeGrid;

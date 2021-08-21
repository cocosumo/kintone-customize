/* eslint-disable react/jsx-boolean-value */
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import './TimeGrid.css';

const TimeGrid = ({
  selectedDate,
  didMountHandler,
  onClickDate,
  onClickEvent,
  eventChange,
  events,
}) => {
  console.log(selectedDate);
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      initialDate={selectedDate}
      slotMinTime="08:00:00"
      slotMaxTime="21:00:00"
      validRange={{
        start: selectedDate,
        end: selectedDate,
      }}
      headerToolbar={false}
      height="auto"
      viewDidMount={didMountHandler}
      selectable={true}
      select={onClickDate}
      eventResize={eventChange}
      eventDrop={eventChange}
      events={events}
      eventClick={onClickEvent}
      businessHours={{
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        startTime: '9:00',
        endTime: '20:00',
      }}
      eventConstraint="businessHours"
      selectConstraint="businessHours"
      eventBorderColor="white"
    />
  );
};
export default TimeGrid;

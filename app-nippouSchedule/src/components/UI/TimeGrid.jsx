/* eslint-disable react/jsx-boolean-value */
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';

const TimeGrid = ({
  selectedDate,
  didMountHandler,
  onClickDate,
  onClickEvent,
  events,
}) => (
  <FullCalendar
    locale={jaLocale}
    plugins={[timeGridPlugin, interactionPlugin]}
    initialView="timeGridDay"
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
    // dateClick={onClickDate}
    events={events}
    eventClick={onClickEvent}
    businessHours={{
      startTime: '9:00',
      endTime: '20:00',
    }}
    eventConstraint="businessHours"
    selectConstraint="businessHours"

  />
);

export default TimeGrid;

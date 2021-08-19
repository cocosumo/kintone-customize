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
    slotMinTime="09:00:00"
    slotMaxTime="20:00:00"
    validRange={{
      start: selectedDate,
      end: selectedDate,
    }}
    headerToolbar={false}
    height="auto"
    viewDidMount={didMountHandler}
    dateClick={onClickDate}
    events={events}
    eventClick={onClickEvent}
  />
);

export default TimeGrid;

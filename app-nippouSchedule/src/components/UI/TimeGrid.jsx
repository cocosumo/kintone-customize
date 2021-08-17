import FullCalendar from '@fullcalendar/react'; // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';

const eventsList = [];

const TimeGrid = ({
  selectedDate,
  didMountHandler,
  onClickDateHandler,
  events,
}) => {
  // const calendarAPI = calendarRef.current.getApi();

  console.log(events, 'fullCalendar');

  return (
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
      dateClick={onClickDateHandler}
      events={events}
    />
  );
};

export default TimeGrid;

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import './MonthCalendar.css';

const MonthCalendar = ({ remainingYasumi, clickDayHandler, datesSetHandler }) => {
  console.log('rendered', remainingYasumi);
  const dayRenderHandler = (args) => {
    // console.log(args);
  };

  return (
    <FullCalendar
      datesSet={datesSetHandler}
      dayCellDidMount={dayRenderHandler}
      dayCellClassNames={['day-cell']}
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={clickDayHandler}
      locale={jaLocale}
      fixedWeekCount={false}
      customButtons={{
        remainingYasumi: {
          text: `残りの休み: ${remainingYasumi || 0}`,
        },
      }}
      headerToolbar={{
        start: 'title',
        center: 'remainingYasumi',
        end: 'today prev,next',
      }}
      events={[
        {
          start: '2021-09-10T10:00:00',
          allDay: true,
          display: 'background',
          classNames: ['day-all'],
        },
      ]}

    />
  );
};

export default MonthCalendar;

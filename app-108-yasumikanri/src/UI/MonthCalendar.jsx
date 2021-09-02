import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import './MonthCalendar.css';

const MonthCalendar = ({ clickDayHandler }) => {
  console.log('rendered');

  return (
    <FullCalendar
      dayCellClassNames={['day-cell']}
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={clickDayHandler}
      locale={jaLocale}
      fixedWeekCount={false}
      customButtons={{
        remainingYasumi: {
          text: `残りの休み: ${10}`,
        },
      }}
      headerToolbar={{
        start: 'title',
        center: 'remainingYasumi',
        end: 'today prev,next',
      }}
    />
  );
};

export default MonthCalendar;

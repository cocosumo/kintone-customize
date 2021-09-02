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
        myCustomButton: {
          text: 'custom!',
        },
      }}
      headerToolbar={{
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
      }}
    />
  );
};

export default MonthCalendar;

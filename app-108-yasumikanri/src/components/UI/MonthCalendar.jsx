import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Box } from '@mui/material';
import './MonthCalendar.css';
import DayCell from './DayCell';

const MonthCalendar = ({
  remainingYasumi,
  clickDayHandler,
  clearHandler,
  datesSetHandler,
  yasumiRecords,
  currentMonth,
  isEditing,
}) => {
  const dayCellContentRender = (args) => <DayCell {...{ args, yasumiRecords, currentMonth }} />;

  return (
    <Box>
      <FullCalendar
        dayCellContent={dayCellContentRender}
        datesSet={datesSetHandler}
        dayCellClassNames={['day-cell']}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={clickDayHandler}
        locale={jaLocale}
        fixedWeekCount={false}
        height="auto"
        customButtons={{
          remainingYasumi: {
            text: `残りの休み: ${remainingYasumi || 0}`,
          },
          loading: {
            text: '編集中...',
          },
          clear: {
            text: 'リセット',
            click: clearHandler,
          },
        }}
        headerToolbar={{
          start: 'title',
          center: 'remainingYasumi',
          end: `${!isEditing ? 'prev,next' : 'loading'}`,
        }}
        footerToolbar={{
          start: !isEditing ? 'clear' : 'loading',
        }}

      />
    </Box>
  );
};

export default MonthCalendar;

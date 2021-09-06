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
  isSaving,
}) => {
  const dayCellContentRender = (args) => <DayCell {...{ args, yasumiRecords, currentMonth }} />;

  return (
    <Box height="100vh">
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
            text: '保存中...',
          },
          clear: {
            text: '全部削除',
            click: clearHandler,
          },
        }}
        headerToolbar={{
          start: 'title',
          center: 'remainingYasumi',
          end: `${!isSaving ? 'prev,next' : 'loading'}`,
        }}
        footerToolbar={{
          start: 'clear',
        }}

      />
    </Box>
  );
};

export default MonthCalendar;

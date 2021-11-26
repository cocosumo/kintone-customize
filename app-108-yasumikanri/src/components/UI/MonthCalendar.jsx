/* eslint-disable react/prop-types */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import {Box} from '@mui/material';
import './MonthCalendar.css';
import DayCell from './DayCell';
import Confirmation from '../dialogs/Confirmation';
import {useState} from 'react';

const MonthCalendar = ({
  remainingYasumi,
  clickDayHandler,
  clearHandler,
  datesSetHandler,
  yasumiRecords,
  currentMonth,
  isEditing,
}) => {
  const [confirmation, setConfirmation] = useState({isOpen: false, isPressedYes: false});

  const dayCellContentRender = (args) => <DayCell {...{args, yasumiRecords, currentMonth}} />;

  const onResetClickHandler = () => {
    setConfirmation({...confirmation, ...{isOpen: true}});
  };

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
            click: onResetClickHandler,
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
      <Confirmation
        question={<>当月、通常休みは全て削除されます。<br />本当にリセットしますか？</>}
        open={confirmation.isOpen}
        setOpen={setConfirmation}
        actionOnYes={clearHandler}
      />
    </Box>
  );
};

export default MonthCalendar;

import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import { deleteRedundantType } from '../../backend/yasumiKanri';
import swapArrayLocs from '../../helpers/utils';
import TypeIcon from './TypeIcon';

const DayContent = ({ dayRecords }) => {
  let dayToRender = [...dayRecords];
  let shouldAnim = false;

  /* Clean duplicates */
  const redundantDayOrdinary = dayRecords.filter(({ type }) => type === 'day-ordinary');

  if (redundantDayOrdinary.length > 1) {
    deleteRedundantType(redundantDayOrdinary);
    dayToRender = dayRecords.slice(0, 1);
  }
  /* End Clean duplicates */

  if (dayToRender.length > 0) {
    shouldAnim = true;
  }
  if (dayToRender.length > 1 && dayToRender[0].duration !== 'day-am') {
    swapArrayLocs(dayToRender, 0, 1);
  }

  const iconContent = dayToRender.map(
    (record) => (
      <TypeIcon
        siblings={dayToRender.length}
        key={record.type + record.id}
        {...{ record }}
      />
    ),
  );

  return (
    <Zoom key={dayToRender[0]?.duration} in={shouldAnim}>
      <Box
        key={dayToRender[0].type}
        sx={{
          textAlign: 'center', pt: 0.2, pb: 0.8, width: '100%', height: '100%',
        }}
      >

        {iconContent}

      </Box>
    </Zoom>

  );
};
export default DayContent;

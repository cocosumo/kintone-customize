import { Box } from '@mui/material';
import { deleteRedundantType } from '../../backend/yasumiKanri';
import TypeIcon from './TypeIcon';

const DayContent = ({ dayRecords }) => {
  let dayToRender = [...dayRecords];

  /* Clean duplicates */
  const redundantDayOrdinary = dayRecords.filter(({ type }) => type === 'day-ordinary');
  if (redundantDayOrdinary.length > 1) {
    deleteRedundantType(redundantDayOrdinary);
    dayToRender = dayRecords.slice(0, 1);
  }
  /* End Clean duplicates */

  const iconContent = dayToRender.map(
    (record) => <TypeIcon key={record.type + record.id} {...{ record }} />,
  );

  return (
    <Box sx={{
      textAlign: 'center', pt: 0.2, pb: 0.8, height: '100%',
    }}
    >
      {iconContent}
    </Box>
  );
};
export default DayContent;

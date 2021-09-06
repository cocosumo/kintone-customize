import { Box } from '@mui/material';
import TypeIcon from './TypeIcon';

const DayContent = ({ dayRecords }) => {
  const iconContent = dayRecords.map((record) => <TypeIcon key={record.type} {...{ record }} />);

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

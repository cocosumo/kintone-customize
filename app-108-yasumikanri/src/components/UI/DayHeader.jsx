import { Typography } from '@mui/material';

const DayHeader = ({ isRenderDate, dayNumberText }) => (

  <Typography sx={{ color: isRenderDate ? '' : 'gray' }}>
    {dayNumberText}
  </Typography>
);

export default DayHeader;

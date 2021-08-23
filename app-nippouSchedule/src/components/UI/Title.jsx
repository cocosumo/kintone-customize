import { Typography } from '@material-ui/core';

const Title = ({ children }) => (
  <Typography
    variant="h5"
    sx={{
      textAlign: 'center',
      mb: '1em',
      fontWeight: 700,
    }}
  >
    {children}
  </Typography>
);

export default Title;

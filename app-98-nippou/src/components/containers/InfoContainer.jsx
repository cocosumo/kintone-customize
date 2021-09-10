import { Grid, Paper } from '@material-ui/core';

const InfoContainer = ({ children }) => (
  <Grid sx={{ mb: 1, p: 1 }}>
    <Paper sx={{ p: 1 }}>
      {children}
    </Paper>
  </Grid>
);

export default InfoContainer;

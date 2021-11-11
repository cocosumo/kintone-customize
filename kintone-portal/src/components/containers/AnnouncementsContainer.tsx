import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';


export const AnnouncementsContainer = ({children} : Props) => {
  return (
    <Grid
      container
      justifyContent="space-around"

    >
      {children}
    </Grid>
  );
};

AnnouncementsContainer.propTypes = {
  children: PropTypes.node.isRequired
};
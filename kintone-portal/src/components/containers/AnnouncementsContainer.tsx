import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {Props} from './Props.type';


export const AnnouncementsContainer = ({children} : Props) => {
  return (
    <Grid
      container
      justifyContent="space-around"
      rowSpacing={2}
    >
      {children}
    </Grid>
  );
};

AnnouncementsContainer.propTypes = {
  children: PropTypes.node.isRequired
};
import {Typography} from '@mui/material';
import PropTypes from 'prop-types';

const Title = ({children}) => {
  return (
    <Typography textAlign="center" variant="h4">
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;


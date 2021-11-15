import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Title = ({children}) => {
  return (
    <Typography
      textAlign="center"
      variant="h4"
    >{children}
    </Typography>
  );
};

export default Title;

Title.propTypes = {
  children: PropTypes.node
};
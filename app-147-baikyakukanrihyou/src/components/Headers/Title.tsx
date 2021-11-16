import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

type Props = {
  children: React.ReactNode,
};

const Title : React.FC<Props> = ({children}) => {
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
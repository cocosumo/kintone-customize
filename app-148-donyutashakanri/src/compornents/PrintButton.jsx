import PropTypes from 'prop-types';
import {Button} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const PrintButton = ({onClick}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={<PrintIcon />}
    >
      印刷
    </Button>
  );
};

PrintButton.propTypes = {
  onClick: PropTypes.func
};
export default PrintButton;

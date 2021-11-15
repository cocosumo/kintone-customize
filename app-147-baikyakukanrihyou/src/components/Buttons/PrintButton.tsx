import Button from '@mui/material/Button';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PropTypes from 'prop-types';

type Props = {
  onPrint?: React.MouseEventHandler
}

const PrintButton : React.FC<Props> = ({onPrint}) => {
  if (!onPrint) return null;

  return (
    <Button
      onClick={onPrint}
      variant="contained"
      startIcon={<LocalPrintshopIcon />}
    >印刷
    </Button>
  );
};

export default PrintButton;

PrintButton.propTypes = {
  onPrint: PropTypes.any
};
import {Button} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const PrintButton = () => {
  return (
    <Button
      variant="contained"
      startIcon={<PrintIcon />}
    >
      印刷
    </Button>
  );
};

export default PrintButton;

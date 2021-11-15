import Button from '@mui/material/Button';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const PrintButton = () => {
  return <Button variant="contained" startIcon={<LocalPrintshopIcon />}>印刷</Button>;
};

export default PrintButton;
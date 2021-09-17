import { Typography } from '@mui/material';
import ModalAny from '../containers/ModalAny';
import Loading from '../../assets/loading.gif';

const Progress = () => (
  <ModalAny>
    <Typography sx={{ textAlign: 'center', fontSize: 16 }}>
      Loading...
    </Typography>
    <img
      width={200}
      src={Loading}
      alt="type"
    />
  </ModalAny>

);

export default Progress;

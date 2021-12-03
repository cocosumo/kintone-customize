import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import KintoneLogo from './../../../assets/logo-kintone.png';

export default function KintoneButton() {
  return (
    <Toolbar>
      <Button
        fullWidth
        onClick={() => {
          window.location.href = 'https://rdmuhwtt6gx7.cybozu.com/k/#/portal';
        }}
      >
        <img
          width="50px"
          src={KintoneLogo}
          alt=""
        />
      </Button>
    </Toolbar>
  );
}
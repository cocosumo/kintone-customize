import YumeSnack from '../YumeSnack';

const ErrorSnack = ({ open, onClose }) => (
  <YumeSnack {
    ...{
      message: '上限です',
      severity: 'error',
      open,
      onClose,
      duration: 800,
    }}
  />

);

export default ErrorSnack;

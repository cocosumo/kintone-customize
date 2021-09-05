import YumeSnack from './YumeSnack';

const ActivitySnack = ({
  open,
  onClose,
  type,

}) => {
  let snackProps = {};
  switch (type) {
    case 'aboveLimit':
      snackProps = {
        duration: 800,
        message: '上限です。',
        severity: 'error',
      };
      break;

    default:
      break;
  }

  const { duration, message, severity } = snackProps;

  return (
    <YumeSnack {
    ...{
      open, onClose, duration, message, severity,
    }}
    />
  );
};

export default ActivitySnack;

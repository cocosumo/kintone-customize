import YumeSnack from './YumeSnack';

const ActivitySnack = ({
  open,
  onClose,
  snackType,

}) => {
  let snackProps = {};
  switch (snackType) {
    case 'aboveLimit':
      snackProps = {
        duration: 800,
        message: '上限です。',
        severity: 'error',
      };
      break;
    case 'saveSuccess':
      snackProps = {
        duration: 2000,
        message: '保存が出来ました。',
        severity: 'success',
      };
      break;
    case 'saveError':
      snackProps = {
        duration: 4000,
        message: `保存に問題がありました。
        ブラウザーを更新してください。それでも、問題がありましたら、
        お手数ですが、次のリンクにて、ご連絡ください。
        https://rdmuhwtt6gx7.cybozu.com/k/101/edit`,
        severity: 'warning',
      };
      break;
    default:
      break;
  }

  const { duration, message, severity } = snackProps;

  return (
    <YumeSnack
      open={open}
      onClose={onClose}
      {...{
        duration, message, severity, snackType,
      }}
    />
  );
};

export default ActivitySnack;

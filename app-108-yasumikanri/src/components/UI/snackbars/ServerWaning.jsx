import YumeSnack from '../YumeSnack';

const WarningSnack = ({ open, onClose }) => (
  <YumeSnack {
    ...{
      message: 'サーバーとの接続に問題がありました。ブラウザーを更新してください。',
      severity: 'warning',
      open,
      onClose,
    }}
  />

);

export default WarningSnack;

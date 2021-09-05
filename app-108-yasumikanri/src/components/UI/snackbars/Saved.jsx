import YumeSnack from '../YumeSnack';

const SavedSnack = ({ open, onClose }) => (
  <YumeSnack {
    ...{
      message: '保存できました。',
      severity: 'success',
      open,
      onClose,
    }}
  />

);

export default SavedSnack;

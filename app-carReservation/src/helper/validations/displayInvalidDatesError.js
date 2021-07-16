import displayError from '../displayError';

const displayInvalidDatesError = () => {
  displayError(
    '終了日が開始日より前です',
    'スケジュールの終了日が開始日より前の日付になっています。  終了日には開始日以降の日付を指定して下さい',
  );
};

export default displayInvalidDatesError;

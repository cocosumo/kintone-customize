import Swal from 'sweetalert2';

export const showError = (title, msg) => {
  Swal.fire(title, msg, 'error');
};

export const showInvalidDatesError = () => {
  showError(
    '終了日が開始日より前です',
    'スケジュールの終了日が開始日より前の日付になっています。  終了日には開始日以降の日付を指定して下さい',
  );
};

export const showCantReserveError = () => {
  showError(
    'Oopss..予約出来ませんでした。',
    '車の予約状況と期間を確認してください。',
  );
};

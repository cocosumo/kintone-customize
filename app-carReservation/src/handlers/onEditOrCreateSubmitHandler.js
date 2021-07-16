import getConflictReservations from '../helper/getConflictReservations';
import { showCantReserveError } from '../helper/showAlert';
import isValidTimeDuration from '../helper/validations/isValidTimeDuration';

const onEditOrCreateSubmitHandler = async (event) => {
  const { record } = event;
  const { 開始, 終了 } = record;

  const conflictReservations = await getConflictReservations(record);
  const isWithConflict = conflictReservations.records.length > 0;

  const isValid = !isWithConflict && isValidTimeDuration(開始.value, 終了.value);

  if (!isValid) showCantReserveError();

  return isValid;
};

export default onEditOrCreateSubmitHandler;

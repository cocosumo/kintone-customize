import getConflictReservations from '../helper/getConflictReservations';
import displayInvalidDatesError from '../helper/validations/displayInvalidDatesError';

const onEditOrCreateSubmitHandler = async (event) => {
  const { record } = event;

  const conflictReservations = await getConflictReservations(record);
  const isWithConflict = conflictReservations.records.length > 0;

  if (isWithConflict) {
    displayInvalidDatesError();
  }
  return !isWithConflict;
};

export default onEditOrCreateSubmitHandler;

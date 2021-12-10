import {fetchConflictByCarAndDate, fetchConflictByDateExceptId} from '../backend/fetchReservations';

const getConflictReservations = async (record, isByCar = false) => {
  const {value: startDateTime} = record.開始;
  const {value: endDateTime} = record.終了;
  const {value: selectedCar} = record.号車;

  console.log('selected', selectedCar);

  const {$id} = record;
  const recordId = $id ? $id.value : 0;

  if (isByCar) {
    return fetchConflictByCarAndDate(selectedCar, startDateTime, endDateTime, recordId);
  }
  return fetchConflictByDateExceptId(startDateTime, endDateTime, recordId);
};

export default getConflictReservations;

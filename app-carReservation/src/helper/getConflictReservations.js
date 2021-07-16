import { fetchConflictByDateExceptId } from '../backend/fetchReservations';

const getConflictReservations = async (record) => {
  const { value: startDateTime } = record.開始;
  const { value: endDateTime } = record.終了;
  const { $id } = record;
  const recordId = $id ? $id.value : 0;

  return fetchConflictByDateExceptId(
    startDateTime, endDateTime, recordId,
  );
};

export default getConflictReservations;

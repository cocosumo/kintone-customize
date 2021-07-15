import { fetchConflictByCarAndDate } from '../backend/fetchReservations';

const getConflictReservations = async (record) => {
  const { value: carNumber } = record.号車;
  const { value: startDateTime } = record.開始;
  const { value: endDateTime } = record.終了;
  const { value: recordId = 0 } = record.$id;

  return fetchConflictByCarAndDate(
    carNumber, startDateTime, endDateTime, recordId,
  );
};

const isDifferent = (x, y) => {
  const { 号車: xCarNumber, 開始: xStart, 終了: xEnd } = x;
  const { 号車: yCarNumber, 開始: yxStart, 終了: yEnd } = y;

  return !(xCarNumber.value === yCarNumber.value
    && xStart.value === yxStart.value
    && xEnd.value === yEnd.value);
};

const checkIfChangedOrNew = (current, conflict) => {
  const { $id: id } = current;
  const { records: conflictRecords } = conflict;
  let isChangedOrNew = true;

  if (id) {
    const origRecord = conflictRecords.filter(
      ({ $id: origId }) => origId.value === id.value,
    );
    if (origRecord) {
      isChangedOrNew = isDifferent(current, origRecord[0]);
    }
  }
  return isChangedOrNew;
};

const onEditOrCreateSubmitHandler = async (event) => {
  const { record } = event;

  const conflictReservations = await getConflictReservations(record);

  return conflictReservations.records.length === 0;
};

export default onEditOrCreateSubmitHandler;

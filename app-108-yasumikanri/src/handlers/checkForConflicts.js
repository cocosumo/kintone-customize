import {
  deleteRecordByDates,
  fetchByYasumiDate,
  deleteRedundantRecords,
} from '../backend/yasumiKanri';
import { getKintoneYasumiWeight, normType } from '../helpers/converters';
import messages from '../helpers/messages';

const getDate = (record) => record.yasumiDate.value;
const getDuration = (record) => record.duration.value;
/* const getType = (record) => record.type.value;
const getId = (record) => record.$id.value; */

const compareLeaves = (leaveRec, specialLeaveRec) => {
  const leaveDuration = getDuration(leaveRec);
  const specialLeaveDuration = getDuration(specialLeaveRec);
  const isSameDuration = leaveDuration === specialLeaveDuration;
  if (!isSameDuration) {
    return messages.withConflict;
  }
  return ['どちらかを削除してください。', 'どちらかを削除してください。'];
};

const checkIfInputIsConflict = (inputRecord, existingRecord, isEdit) => {
  const inputDuration = getDuration(inputRecord);
  const inputWeight = getKintoneYasumiWeight(inputDuration);
  const existingDuration = getDuration(existingRecord);

  if (inputWeight === 1) {
    return messages.withConflict;
  } if (inputWeight === 0.5) {
    if (inputDuration !== existingDuration) {
      if (!isEdit) deleteRecordByDates(getDate(inputRecord));
    } else {
      return messages.withConflict;
    }
  }
  return null;
};

const groupByType = (recsByDate) => recsByDate.reduce((
  accu,
  curr,
) => {
  const {
    duration: { value: duration },
    type: { value: type },
  } = curr;

  const yasumiWeight = getKintoneYasumiWeight(duration);

  accu.total += yasumiWeight;
  accu[normType[type]].total += yasumiWeight;
  accu[normType[type]].records = accu[normType[type]].records.concat(curr);
  return accu;
}, {
  total: 0,
  'day-ordinary': { total: 0, records: [] },
  'day-leave': { total: 0, records: [] },
  'day-leaveSpecial': { total: 0, records: [] },
});

const checkForConflicts = async (event) => {
  const { record, type } = event;
  const isEdit = type.includes('edit');

  const {
    yasumiDate: { value: yasumiDate },
    $id,
  } = record;
  let recsByDate = await fetchByYasumiDate(yasumiDate);
  if (isEdit) {
    recsByDate = recsByDate.filter(({ $id: resId }) => $id.value !== resId.value);
  }

  const groupedRecords = groupByType(recsByDate);
  const {
    total: totalWeight,
    'day-ordinary': { total: totalOrdinary },
    'day-leave': { total: totalLeave, records: recsLeave },
    'day-leaveSpecial': { total: totalLeaveSpecial, records: recsLeaveSpecial },
  } = groupedRecords;

  let conflictError;

  if (totalWeight === totalOrdinary) {
    if (!isEdit) deleteRecordByDates(yasumiDate, $id?.value);
  } else if (totalWeight === 1) {
    if (((totalLeave || totalLeaveSpecial) === 1)) {
      if ((recsLeave.length || recsLeaveSpecial.length) === 1) {
        conflictError = messages.withConflict;
      } else {
        deleteRedundantRecords(recsLeave);
        deleteRedundantRecords(recsLeaveSpecial);
        conflictError = messages.deletedDuplicate;
      }
    } else if ((totalLeave + totalLeaveSpecial) === 1) {
      conflictError = compareLeaves(recsLeave[0], recsLeaveSpecial[0]);
    } else if ((totalLeave || totalLeaveSpecial) === 0.5) {
      /* Not checked */
      conflictError = checkIfInputIsConflict(
        record,
        totalLeave ? recsLeave[0] : recsLeaveSpecial[0],
      );
    }
  } else if (totalWeight === 0.5) {
    if (totalOrdinary === 0.5) {
      deleteRecordByDates(yasumiDate);
    } else if ((totalLeave || totalLeaveSpecial) === 0.5) {
      conflictError = checkIfInputIsConflict(
        record,
        totalLeave ? recsLeave[0] : recsLeaveSpecial[0],
        isEdit,
      );
    }
  } else if (totalWeight > 1) {
    const totalLeaveAndSpecial = totalLeave + totalLeaveSpecial;

    if (totalLeave + totalLeave === 0) {
      deleteRecordByDates(yasumiDate);
    } else if (totalLeaveAndSpecial > 1) {
      deleteRecordByDates(yasumiDate);
      deleteRedundantRecords(recsLeave.concat(recsLeaveSpecial));
      conflictError = messages.deletedDuplicate;
    } else if ((totalLeave || totalLeave === 1) && totalLeaveAndSpecial === 1) {
      deleteRecordByDates(yasumiDate);
      conflictError = messages.withConflict;
    } else if (totalLeave + totalLeaveSpecial === 1) {
      conflictError = compareLeaves(recsLeave[0], recsLeaveSpecial[0]);
    } else if ((totalLeave || totalLeaveSpecial) === 0.5) {
      conflictError = checkIfInputIsConflict(
        record,
        totalLeave ? recsLeave[0] : recsLeaveSpecial[0],
      );
    }
  }

  return conflictError;
};

export default checkForConflicts;

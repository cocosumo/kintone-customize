import deleteRecords from '../../../kintone-api/deleteRecords';
import {
  deleteRecordsByDates,
  fetchByYasumiDate,
  deleteRedundantRecords,
} from '../backend/yasumiKanri';
import { getKintoneType, getKintoneYasumiWeight, normType } from '../helpers/converters';
import messages from '../helpers/messages';

const getDate = (record) => record.yasumiDate.value;
const getDuration = (record) => record.duration.value;
const getType = (record) => record.type.value;
const getId = (record) => record.$id.value;

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
  console.log(inputRecord, existingRecord);
  const inputDuration = getDuration(inputRecord);
  const inputType = getType(inputRecord);
  const inputWeight = getKintoneYasumiWeight(inputDuration);
  const existingDuration = getDuration(existingRecord);
  const existingType = getType(existingRecord);
  const existingId = getId(existingRecord);

  if (inputWeight === 1) {
    if (existingType === getKintoneType('day-ordinary')) {
      deleteRecords({ ids: [existingId] });
    } else {
      return messages.withConflict;
    }
  } if (inputWeight === 0.5) {
    if (inputDuration === existingDuration) {
      console.log('inputDuration === existingDuration');
      if (existingType === getKintoneType('day-ordinary')) {
        deleteRecords({ ids: [existingId] });
      } else {
        return messages.withConflict;
      }
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
    'day-ordinary': { total: totalOrdinary, records: recsOrdinary },
    'day-leave': { total: totalLeave, records: recsLeave },
    'day-leaveSpecial': { total: totalLeaveSpecial, records: recsLeaveSpecial },
  } = groupedRecords;

  let conflictError = null;
  console.log(groupedRecords);
  if (totalWeight === 1) {
    console.log('totalWeight === 1');
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
        recsLeave[0] || recsLeaveSpecial[0],
        isEdit,
      );
    }
  } else if (totalWeight === 0.5) {
    console.log('totalWeight === 0.5');
    if (totalOrdinary === 0.5) {
      conflictError = checkIfInputIsConflict(
        record,
        recsLeave[0] || recsLeaveSpecial[0] || recsOrdinary[0],
      );
    } else if ((totalLeave || totalLeaveSpecial) === 0.5) {
      conflictError = checkIfInputIsConflict(
        record,
        totalLeave ? recsLeave[0] : recsLeaveSpecial[0],
        isEdit,
      );
    }
  } else if (totalWeight > 1) {
    const totalLeavePlusSpecial = totalLeave + totalLeaveSpecial;
    console.log('greater than');
    if (totalLeavePlusSpecial === 0) {
      console.log('otalLeavePlusSpecial === 0');
      deleteRecordsByDates(yasumiDate);
    } else if (totalLeaveAndSpecial > 1) {
      console.log('totalLeaveAndSpecial > 1');
      deleteRecordsByDates(yasumiDate);
      deleteRedundantRecords(recsLeave.concat(recsLeaveSpecial));
      conflictError = messages.deletedDuplicate;
    } else if ((totalLeave || totalLeaveSpecial === 1) && totalLeavePlusSpecial === 1) {
      console.log('totalLeave || totalLeaveSpecial === 1) && totalLeavePlusSpecial === 1');
      deleteRecordsByDates(yasumiDate);
      conflictError = messages.withConflict;
    } else if (totalLeavePlusSpecial === 1) {
      console.log(totalLeavePlusSpecial === 1);
      conflictError = compareLeaves(recsLeave[0], recsLeaveSpecial[0]);
    } else if ((totalLeave || totalLeaveSpecial) === 0.5) {
      console.log('totalLeave || totalLeaveSpecial) === 0.5');
      conflictError = checkIfInputIsConflict(
        record,
        totalLeave ? recsLeave[0] : recsLeaveSpecial[0],
      );
    }
  }

  return conflictError;
};

export default checkForConflicts;

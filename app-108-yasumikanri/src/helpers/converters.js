import { getEmployeeNumber } from '../backend/user';

export const normDuration = {
  一日: 'day-whole',
  午前休み: 'day-am',
  午後休み: 'day-pm',
};

export const yasumiWeight = (duration) => {
  switch (duration) {
    case 'day-whole': return 1;
    case 'day-am': return 0.5;
    case 'day-pm': return 0.5;
    default: return 0;
  }
};

export const normType = {
  通常休み: 'day-ordinary',
  有休: 'day-leave',
  特別有休: 'day-leaveSpecial',
};

export const normStatus = {
  未申請: 'unprocessed',
  上長確認中: 'processing',
  承認: 'approved',
  差し戻し: 'returned',
};

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

export const getKintoneType = (type) => getKeyByValue(normType, type);
export const getKintoneDuration = (duration) => getKeyByValue(normDuration, duration);

export const shiftToNext = (duration, remainingYasumi) => {
  switch (duration) {
    case 'day-whole': return 'day-am';
    case 'day-am': return 'day-pm';
    case 'day-pm': return null;
    default:
      if (remainingYasumi >= 1) {
        return 'day-whole';
      }
      return 'day-am';
  }
};

export const resolveNewWeight = (prev, curr) => yasumiWeight(curr) - yasumiWeight(prev);

const toKintoneRecord = ({ date, type, duration }) => {
  const eid = getEmployeeNumber();
  return {
    employeeNumber: { value: +eid },
    type: { value: getKintoneType(type) },
    duration: { value: getKintoneDuration(duration) },
    yasumiDate: { value: date },
  };
};

export const getOrdinaryYasumi = (rawRecord) => rawRecord.filter(({ type }) => type === 'day-ordinary');

export const toKintoneRecords = (unsavedRecords, savedRecords) => {
  const fallbackId = (date, rid) => (rid || getOrdinaryYasumi(savedRecords[date])[0].id);

  const result = unsavedRecords.map((item) => {
    const kr = toKintoneRecord(item);
    return savedRecords ? { id: fallbackId(item.date, item.id), record: kr } : kr;
  });
  return result;
};

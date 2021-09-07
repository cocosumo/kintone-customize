import { getEmployeeNumber } from '../backend/user';

export const normDuration = {
  一日: 'day-whole',
  午前休み: 'day-am',
  午後休み: 'day-pm',
};

export const getYasumiWeight = (duration) => {
  switch (duration) {
    case 'day-whole': return 1;
    case 'day-am': return 0.5;
    case 'day-pm': return 0.5;
    default: return 0;
  }
};

export const getKintoneYasumiWeight = (duration) => {
  switch (duration) {
    case '一日': return 1;
    case '午前休み': return 0.5;
    case '午後休み': return 0.5;
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
export const getKintoneStatus = (status) => getKeyByValue(normStatus, status);

export const shiftToNext = (duration, remainingYasumi, availableTime) => {
  if (availableTime === 'day-whole') {
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
  } else {
    if (duration === null) {
      return availableTime;
    }
    return null;
  }
};

export const resolveNewWeight = (prev, curr) => getYasumiWeight(curr) - getYasumiWeight(prev);

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

export const snackDetails = (snackType) => {
  switch (snackType) {
    case 'aboveLimit':
      return {
        duration: 800,
        message: '上限です。',
        severity: 'error',
      };

    case 'saveSuccess':
      return {
        duration: 2000,
        message: '保存が出来ました。',
        severity: 'success',
      };

    case 'saveError':
      return {
        duration: 4000,
        message: `保存に問題がありました。
        ブラウザーを更新してください。それでも、問題がありましたら、
        お手数ですが、次のリンクにて、ご連絡ください。
        https://rdmuhwtt6gx7.cybozu.com/k/101/edit`,
        severity: 'warning',
      };
    case 'deletedExcess':
      return {
        duration: 6000,
        message: '休み数は上限に超えました。削除します。',
        severity: 'warning',
      };
    case 'resetInput':
      return {
        duration: 1000,
        message: 'リセット出来ました。',
        severity: 'info',
      };

    default: return {};
  }
};

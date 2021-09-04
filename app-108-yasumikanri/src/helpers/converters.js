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

export const resolveNewWeight = (prev, curr) => {
  const p = yasumiWeight(prev);
  const c = yasumiWeight(curr);

  return c - p;
};

// 1 0 = -1
// 0 0.5 = 0.5
// 0 1

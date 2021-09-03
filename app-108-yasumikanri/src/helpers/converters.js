export const normDuration = {
  一日: 'day-whole',
  午前休み: 'day-am',
  午後休み: 'day-pm',
};

export const yasumiWeight = {
  'day-whole': 1,
  'day-am': 0.5,
  'day-pm': 0.5,
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

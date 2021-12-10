const getUniqueValues = (records, field) => {
  const array = records;

  const result = [];
  const map = new Map();
  for (const item of array) {
    const {value} = item[field];

    if (!map.has(value)) {
      map.set(value, true); // set any value to Map
      result.push(value);
    }
  }

  return result;
};

export const arrayDiff = (source, toRemove) => source.filter((el) => !toRemove.includes(el));


export const extractBasicCarDetails = ({レコード番号, 号車, 店舗}) => {
  const recordId = レコード番号 ? レコード番号.value : 0;
  return [recordId, 号車.value, 店舗.value];
};

export const toArray = (record) => record.map(extractBasicCarDetails);

export default getUniqueValues;

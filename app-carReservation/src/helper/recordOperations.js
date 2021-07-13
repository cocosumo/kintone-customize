const getUniqueValues = (records, field) => {
  const array = records;

  const result = [];
  const map = new Map();
  for (const item of array) {
    const { value } = item[field];

    if (!map.has(value)) {
      map.set(value, true); // set any value to Map
      result.push(value);
    }
  }

  return result;
};

export const arrayDiff = (source, toRemove) => source.filter((el) => !toRemove.includes(el));

export default getUniqueValues;

import { fetchAllRecords } from '../../../kintone-api/fetchRecords';

const fetchQualifications = () => fetchAllRecords();

export const fetchTakkenshi = () => fetchAllRecords({ filterCond: 'qualificationChoices in ("宅建士")' });

export const getTakkenshiCountPerStore = async () => {
  const takkenshi = (await fetchTakkenshi()).records;
  return takkenshi.reduce((prev, { store: { value: store } }) => {
    const newObj = { ...prev };
    newObj[store] = (newObj[store] || 0) + 1;
    return newObj;
  }, {});
};

export const groupTakkenshiPerStore = async () => {
  const takkenshi = (await fetchTakkenshi()).records;
  return takkenshi.reduce((prev, curr) => {
    const { store: { value: store } } = curr;
    const newObj = { ...prev };
    newObj[store] = (newObj[store] || []).concat({ ...curr });
    return newObj;
  }, {});
};

export default fetchQualifications;

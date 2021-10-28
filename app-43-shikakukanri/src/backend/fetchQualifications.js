import {fetchAllRecords} from '../../../kintone-api/fetchRecords';

const fetchQualifications = () => fetchAllRecords();

export const fetchTakkenshi = () => fetchAllRecords({filterCond: 'qualificationChoices in ("宅建士")'});

export const getTakkenshiCountPerStore = async () => {
  const takkenshi = (await fetchTakkenshi()).records;
  return takkenshi.reduce((prev, {store: {value: store}}) => {
    const newObj = {...prev};
    newObj[store] = (newObj[store] || 0) + 1;
    return newObj;
  }, {});
};

export const fetchTakkenshiActive = async (employees) => {
  return (await fetchTakkenshi())
    .records
    .filter(({employeeNumber}) => {
      return employees
        .records
        .find(({レコード番号})=>{
          return レコード番号.value === employeeNumber.value;
        });
    });
};

/**
 *
 * @param {object} employees KintoneRecords
 * @returns {Promise{}} 店舗でグループにした宅建士
 */
export const groupTakkenshiPerStore = async (employees) => {


  const takkenshi = employees
    ? (await fetchTakkenshiActive(employees))
    : (await fetchTakkenshi()).records;

  return takkenshi.reduce((prev, curr) => {
    const {store: {value: store}} = curr;
    const newObj = {...prev};
    newObj[store] = (newObj[store] || []).concat({...curr});
    return newObj;
  }, {});
};

export default fetchQualifications;

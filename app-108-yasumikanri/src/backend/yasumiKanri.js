import { fetchRecords } from '../../../kintone-api/fetchRecords';
import {
  normDuration, normStatus, normType, toKintoneRecords, getYasumiWeight, getKintoneType,
} from '../helpers/converters';
import { getEmployeeNumber } from './user';
import deleteRecords from '../../../kintone-api/deleteRecords';
import addRecords from '../../../kintone-api/addRecords';
import updateRecords from '../../../kintone-api/updateRecords';

const ownRecordFilter = `employeeNumber = "${getEmployeeNumber()}"`;

/**
 * Fetch records on a given date's month
 * @param luxonDate, Date of the month to be processed .
 */
export const fetchYasumiRecords = async (luxonDate) => {
  const startDay = luxonDate.startOf('month').toISODate();
  const endDay = luxonDate.endOf('month').toISODate();

  return fetchRecords({
    condition: [
      ownRecordFilter,
      `yasumiDate >= "${startDay}"`,
      `yasumiDate <= "${endDay}"`,
    ].join(' and '),
  });
};

/**
 * Find duplicate records that matches fields
 * @param {}
 *  @param {String[]} types
 *  @param {ISODate} yasumiDate
 *
 */
export const findDuplicate = async ({ types, yasumiDate }) => {
  const typesStringify = ([].concat(types)).map((item) => `"${item}"`).join(', ');
  const typeQuery = `type in (${typesStringify})`;
  const dateQuery = `yasumiDate = "${yasumiDate}"`;
  const { records } = await fetchRecords({
    condition: [
      ownRecordFilter,
      typeQuery,
      dateQuery,
    ].join(' and '),
  });
  return records;
};

/**
 * Find all records that matches date
 * @param {ISODate} yasumiDate
 */
export const fetchByYasumiDate = async (yasumiDate) => {
  const dateQuery = `yasumiDate = "${yasumiDate}"`;
  const { records } = await fetchRecords({
    condition: [
      ownRecordFilter,
      dateQuery,
    ].join(' and '),
  });
  return records;
};

/**
 * Add records to database.
 * @param {Records[]} records - kintone records to be added.
 */
export const addYasumiRecords = async (unsavedRecords) => {
  if (!unsavedRecords.length) return 'No records to add';
  const kintoneRecords = toKintoneRecords(unsavedRecords);
  return addRecords({ records: kintoneRecords });
};

/**
 * Update records.
 * @param {Records[]} records - kintone records to be updated.
 */
export const updateYasumiRecords = async (unsavedRecords, savedRecords) => {
  if (!unsavedRecords.length) return 'No records to update';
  const kintoneRecords = toKintoneRecords(unsavedRecords, savedRecords);
  return updateRecords({ records: kintoneRecords });
};

/*
yasumiRecToObj(luxonDate)
Example Output
{
 2021-09-01: [
   {
     type: day-ordinary
     duration: day-whole
     status: unprocessed
   }
 ],
}
*/
export const yasumiRecToObj = async (luxonDate) => (
  await fetchYasumiRecords(luxonDate)).records.reduce((accu, curr) => {
  const {
    $id: { value: recordId },
    yasumiDate: { value: yasumiDate },
    type: { value: yasumiType },
    duration: { value: duration },
    ステータス: { value: status },
  } = curr;

  accu[yasumiDate] = (accu[yasumiDate] || []).concat({
    id: recordId,
    type: normType[yasumiType],
    duration: normDuration[duration],
    status: normStatus[status],
  });

  return accu;
}, {});

export const yasumiUsed = (yasumiRecords) => {
  let result = 0;
  Object.values(yasumiRecords).forEach((val) => {
    const { duration = null } = val.find(({ type }) => type === 'day-ordinary') || [];
    result += duration ? getYasumiWeight(duration) : 0;
  });

  return result;
};

/**
 * Delete redundant records from duplicate records
 * @param {Records[]} duplicateRecords, duplicate records that are more than one
 */
export const deleteRedundantRecords = (duplicateRecords) => {
  const redundantRecords = duplicateRecords.slice(1);
  if (redundantRecords.length) {
    return deleteRecords({ ids: redundantRecords.map(({ $id: { value: id } }) => id) });
  }
  return false;
};

/**
 * Delete redundant types
 * @param {String[]} duplicateType, duplicate types
 */
export const deleteRedundantType = (duplicateType) => {
  const redundantRecords = duplicateType.slice(1);
  if (redundantRecords.length) {
    return deleteRecords({ ids: duplicateType.map(({ id }) => id) });
  }
  return false;
};

/**
 * Delete record by dates.
 * @param {String, String[]} dates - dates to be deleted.
 */
export const deleteRecordsByDates = async (dates) => {
  const strToDates = [].concat(dates);

  if (!strToDates.length) return 'No Items to delete.';

  const datesToQuery = strToDates.map((item) => `yasumiDate = "${item}"`).join(' or ');
  const typeToQuery = `type in ("${getKintoneType('day-ordinary')}")`;

  const recordIds = (await fetchRecords({
    condition: [
      ownRecordFilter,
      typeToQuery,
      `(${datesToQuery})`,
    ].join(' and '),
    fields: ['$id'],
  })).records.map(({ $id }) => $id.value);

  console.log(recordIds);
  if (recordIds) {
    return deleteRecords({ ids: recordIds });
  }
  return 'No items to delete';
};

export const defaultRecord = {
  type: 'day-ordinary',
  duration: null,
};

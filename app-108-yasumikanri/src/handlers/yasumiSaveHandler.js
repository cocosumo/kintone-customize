import { debounce } from 'lodash';
import { addYasumiRecords, deleteRecordByDates, updateYasumiRecords } from '../backend/yasumiKanri';
import { getOrdinaryYasumi } from '../helpers/converters';
import refetchData from './refetchData';

const deleteRecords = async ({
  /* Fix this */
  newYasumiRecords,
  savedRecords,
}) => {
  console.log(savedRecords, savedRecords.current, { ...savedRecords }, 'deleteRecords');
  const datesToBeDeleted = [];
  Object.keys(savedRecords.current).forEach((key) => {
    console.log(key, savedRecords.current[key], 'delete');
    if (!newYasumiRecords[key] || savedRecords.current[key].length > newYasumiRecords[key].length) {
      datesToBeDeleted.push(key);
    }
  });

  return deleteRecordByDates(datesToBeDeleted);
};

const pushToRecordsToSave = (recordsToSaveArray, unsavedRecord, key) => {
  const dayOrdinary = getOrdinaryYasumi(unsavedRecord);
  if (dayOrdinary.length) {
    recordsToSaveArray.push({ ...{ date: key }, ...dayOrdinary[0] });
  }
};

const compareAndSaveRecords = async ({
  newYasumiRecords,
  savedRecords,
}) => {
  console.log(savedRecords.current, 'fuck');
  const recordsToAdd = [];
  const recordsToUpdate = [];
  console.log(savedRecords.current, 'shit');
  Object.keys(newYasumiRecords).forEach(
    (key) => {
      console.log(key, savedRecords.current[key]);
      if (!savedRecords.current[key]
        || newYasumiRecords[key].length > savedRecords.current[key].length) {
        pushToRecordsToSave(recordsToAdd, newYasumiRecords[key], key);
      } else if (
        JSON.stringify(newYasumiRecords[key]) !== JSON.stringify(savedRecords.current[key])) {
        pushToRecordsToSave(recordsToUpdate, newYasumiRecords[key], key);
      }
    },
  );
  console.log(recordsToAdd, recordsToUpdate, 'add');
  const promises = [
    // addYasumiRecords(recordsToAdd),
    // updateYasumiRecords(recordsToUpdate, savedRecords),
  ];
  return Promise.allSettled(promises);
};

const yasumiSaveHandler = debounce(async ({
  newYasumiRecords,
  savedRecords,
  maxYasumi,
  currentMonth,
  setRemainingYasumi,
  setYasumiRecords,
  setSnackType,
  setSnackOpen,
}) => {
  console.log(savedRecords, 'fuccked');
  const promises = [
    deleteRecords({ savedRecords, newYasumiRecords }),
    compareAndSaveRecords({ ...savedRecords, newYasumiRecords }),
  ];

  const result = await Promise.allSettled(promises);

  console.log(savedRecords, 'afterBoth');
  const isSuccess = !JSON.stringify(result).includes('rejected');
  setSnackType(isSuccess ? 'saveSuccess' : 'saveErrors');
  setSnackOpen(true);
  /* Add */
  await refetchData({
    currentMonth,
    setYasumiRecords,
    savedRecords,
    setRemainingYasumi,
    maxYasumi,
  });

  /* Add and Update */
}, 1000);

export default yasumiSaveHandler;

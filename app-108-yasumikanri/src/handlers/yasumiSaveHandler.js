import { debounce } from 'lodash';
import { addYasumiRecords, deleteRecordByDates, updateYasumiRecords } from '../backend/yasumiKanri';
import { getOrdinaryYasumi } from '../helpers/converters';
import refetchData from './refetchData';

const deleteRecords = async ({
  /* Fix this */
  newYasumiRecords,
  savedRecords,
}) => {
  const datesToBeDeleted = [];
  Object.keys(savedRecords).forEach((key) => {
    if (!newYasumiRecords[key]) {
      datesToBeDeleted.push(key);
    }
  });

  return deleteRecordByDates(datesToBeDeleted);
};

const pushToRecordsToSave = (recordsToSave, unsavedRecord, key) => {
  const dayOrdinary = getOrdinaryYasumi(unsavedRecord);
  if (dayOrdinary.length) {
    recordsToSave.push({ ...{ date: key }, ...dayOrdinary[0] });
  }
};

const compareAndSaveRecords = async ({
  newYasumiRecords,
  savedRecords,
}) => {
  const recordsToAdd = [];
  const recordsToUpdate = [];
  Object.keys(newYasumiRecords).forEach(
    (key) => {
      if (!savedRecords[key]) {
        pushToRecordsToSave(recordsToAdd, newYasumiRecords[key], key);
      } else if (JSON.stringify(newYasumiRecords[key]) !== JSON.stringify(savedRecords[key])) {
        pushToRecordsToSave(recordsToUpdate, newYasumiRecords[key], key);
      }
    },
  );
  const promises = [
    addYasumiRecords(recordsToAdd),
    updateYasumiRecords(recordsToUpdate, savedRecords),
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
  console.log(newYasumiRecords, 'saving');
  const promises = [
    deleteRecords({ savedRecords: savedRecords.current, newYasumiRecords }),
    compareAndSaveRecords({ savedRecords: savedRecords.current, newYasumiRecords }),
  ];

  const result = await Promise.allSettled(promises);
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

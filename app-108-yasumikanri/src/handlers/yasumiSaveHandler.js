import { debounce } from '@material-ui/core';
import { addYasumiRecords, deleteRecordByDates } from '../backend/yasumiKanri';
import { getOrdinaryYasumi } from '../helpers/converters';
import refetchData from './refetchData';

const deleteRecords = async ({
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
  const promises = [addYasumiRecords(recordsToAdd)];
  return Promise.allSettled(promises);
};

const yasumiSaveHandler = debounce(async ({
  newYasumiRecords,
  savedRecords,
  currentMonth,
  setYasumiRecords,
  setSavedRecords,
}) => {
  const promises = [
    deleteRecords({ savedRecords, newYasumiRecords }),
    compareAndSaveRecords({ savedRecords, newYasumiRecords })];

  const result = await Promise.allSettled(promises);
  console.log(result);
  /* Add */
  await refetchData({ currentMonth, setYasumiRecords, setSavedRecords });

  /* Add and Update */
}, 1000);

export default yasumiSaveHandler;

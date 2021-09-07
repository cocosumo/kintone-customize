import { deleteRecordsByDates } from '../backend/yasumiKanri';
import refetchData from './refetchData';

const clearYasumi = async ({
  yasumiRecords,
  currentMonth,
  maxYasumi,
  setSavedRecords,
  setYasumiRecords,
  setRemainingYasumi,
  setSnackType,
  setSnackOpen,
  setIsSaving,
}) => {
  setIsSaving(true);

  console.log(Object.keys(yasumiRecords));
  await deleteRecordsByDates(Object.keys(yasumiRecords));
  setSnackType('resetInput');
  setSnackOpen(true);
  await refetchData({
    currentMonth,
    setYasumiRecords,
    setSavedRecords,
    setRemainingYasumi,
    maxYasumi,
  });
  setIsSaving(false);
};

export default clearYasumi;

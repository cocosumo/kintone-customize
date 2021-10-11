import { deleteRecordsByDates } from '../backend/yasumiKanri';
import refetchData from './refetchData';

const clearYasumi = async ({
  yasumiRecords,
  currentMonth,
  maxYasumi,
  setSavedRecords,
  setYasumiRecords,
  setRemainingYasumi,
  setSnack,
  setIsSaving,
}) => {
  setIsSaving(true);

  await deleteRecordsByDates(Object.keys(yasumiRecords));
  setSnack({ isOpen: true, type: 'resetInput' });
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

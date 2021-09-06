import { deleteRecordByDates } from '../backend/yasumiKanri';
import { getYasumiWeight } from '../helpers/converters';
import refetchData from './refetchData';

const deleteExcessYasumi = async ({
  remainingYasumi,
  yasumiRecords,
  currentMonth,
  maxYasumi,
  setYasumiRecords,
  setSavedRecords,
  setRemainingYasumi,
  setSnackType,
  setSnackOpen,
}) => {
  if (remainingYasumi < 0) {
    let excessYasumi = Math.abs(remainingYasumi);
    const datesToBeDeleted = [];

    for (const key in yasumiRecords) {
      if (Object.prototype.hasOwnProperty.call(yasumiRecords, key)) {
        const yasumiRecord = yasumiRecords[key].find(({ type }) => type === 'day-ordinary');
        if (yasumiRecord) {
          const weight = getYasumiWeight(yasumiRecord.duration);
          datesToBeDeleted.push(key);
          excessYasumi -= weight;
        }

        if (excessYasumi <= 0) break;
      }
    }

    await deleteRecordByDates(datesToBeDeleted);
    setSnackType('deletedExcess');
    setSnackOpen(true);

    refetchData({
      currentMonth,
      setYasumiRecords,
      setRemainingYasumi,
      setSavedRecords,
      maxYasumi,
    });
  }
};

export default deleteExcessYasumi;

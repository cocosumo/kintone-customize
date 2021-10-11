import { deleteRecordsByDates } from '../backend/yasumiKanri';
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
  setSnack,
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

    await deleteRecordsByDates(datesToBeDeleted);

    setSnack({ isOpen: true, type: 'deletedExcess' });

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

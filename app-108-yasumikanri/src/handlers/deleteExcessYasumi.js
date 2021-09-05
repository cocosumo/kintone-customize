import { deleteRecordByDates } from '../backend/yasumiKanri';
import { getYasumiWeight } from '../helpers/converters';
import refetchData from './refetchData';

const deleteExcessYasumi = async ({
  remainingYasumi,
  yasumiRecords,
  currentMonth,
  setYasumiRecords,
  savedRecords,
  setRemainingYasumi,
  maxYasumi,
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
    refetchData({
      currentMonth,
      setYasumiRecords,
      setRemainingYasumi,
      savedRecords,
      maxYasumi,
    });
  }
};

export default deleteExcessYasumi;

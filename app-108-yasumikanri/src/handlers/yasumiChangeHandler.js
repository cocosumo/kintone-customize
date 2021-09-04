import { defaultRecord } from '../backend/yasumiKanri';
import { resolveNewWeight, shiftToNext } from '../helpers/converters';
import yasumiSaveHandler from './yasumiSaveHandler';

const yasumiChangeHandler = ({
  info,
  yasumiRecords,
  remainingYasumi,
  savedRecords,
  currentMonth,
  setYasumiRecords,
  setSavedRecords,
}) => {
  const { dateStr } = info;
  let newArray = yasumiRecords[dateStr] || [defaultRecord];
  let weight;
  let newDuration;
  let newYasumiRecords;
  if (newArray) {
    newArray = [...newArray].map((item) => {
      if (item.type === 'day-ordinary') {
        newDuration = shiftToNext(item.duration, remainingYasumi);
        weight = resolveNewWeight(item.duration, newDuration);
        return { ...item, duration: newDuration };
      }
      return item;
    }).filter(({ duration }) => Boolean(duration));

    if ((remainingYasumi - weight) < 0) return; // cancel change if no more remaining yasumi

    if (newArray.length) {
      setYasumiRecords((prev) => {
        newYasumiRecords = { ...prev, [dateStr]: newArray };
        return newYasumiRecords;
      });
    } else {
      setYasumiRecords((prev) => {
        const state = { ...prev };
        delete state[dateStr];
        newYasumiRecords = state;
        return state;
      });
    }
  }

  yasumiSaveHandler({
    newYasumiRecords,
    savedRecords,
    currentMonth,
    setYasumiRecords,
    setSavedRecords,
  });
  // process({ newYasumiRecords, savedRecords });
};

export default yasumiChangeHandler;

import { defaultRecord } from '../backend/yasumiKanri';
import { resolveNewWeight, shiftToNext } from '../helpers/converters';
import yasumiSaveHandler from './yasumiSaveHandler';

const yasumiChangeHandler = ({
  info,
  yasumiRecords,
  setYasumiRecords,
  remainingYasumi,
  savedRecords,
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

    if ((remainingYasumi - weight) < 0) return;

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
  yasumiSaveHandler({ newYasumiRecords, savedRecords });
  // process({ newYasumiRecords, savedRecords });
};

export default yasumiChangeHandler;

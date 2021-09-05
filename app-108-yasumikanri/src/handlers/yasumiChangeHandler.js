/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { defaultRecord, yasumiUsed } from '../backend/yasumiKanri';
import { resolveNewWeight, shiftToNext } from '../helpers/converters';
import yasumiSaveHandler from './yasumiSaveHandler';

const yasumiChangeHandler = ({
  info,
  yasumiRecords,
  remainingYasumi,
  savedRecords,
  maxYasumi,
  currentMonth,
  setRemainingYasumi,
  setYasumiRecords,
  setSnackType,
  setSnackOpen,
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

    if ((remainingYasumi - weight) < 0) {
      setSnackType('aboveLimit');
      setSnackOpen(true);
      return; // cancel change if no more remaining yasumi
    }

    ReactDOM.unstable_batchedUpdates(() => {
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
      setRemainingYasumi(maxYasumi.current - yasumiUsed(newYasumiRecords));
    });
  }

  yasumiSaveHandler({
    newYasumiRecords,
    savedRecords,
    currentMonth,
    maxYasumi,
    setRemainingYasumi,
    setYasumiRecords,
    setSnackType,
  });
  // process({ newYasumiRecords, savedRecords });
};

export default yasumiChangeHandler;

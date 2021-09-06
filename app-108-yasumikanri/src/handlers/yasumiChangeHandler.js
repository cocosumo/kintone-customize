/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { defaultRecord, yasumiUsed } from '../backend/yasumiKanri';
import { resolveNewWeight, shiftToNext } from '../helpers/converters';
import yasumiSaveHandler from './yasumiSaveHandler';

const getAvailableDayTime = (newArray) => {
  const leaveDay = newArray.find(({ type }) => type.includes('leave'));

  if (!leaveDay) return 'day-whole';
  if (leaveDay.duration.includes('whole')) return null;

  return (leaveDay.duration.includes('am')) ? 'day-pm' : 'day-am';
};

const yasumiChangeHandler = ({
  info,
  yasumiRecords,
  remainingYasumi,
  savedRecords,
  maxYasumi,
  currentMonth,
  setSavedRecords,
  setRemainingYasumi,
  setYasumiRecords,
  setSnackType,
  setSnackOpen,
}) => {
  const { dateStr } = info;
  console.log(yasumiRecords[dateStr]);
  let newArray = yasumiRecords[dateStr] ? [...yasumiRecords[dateStr]] : [defaultRecord];
  let weight;
  let newDuration;
  let newYasumiRecords;
  const availableTime = getAvailableDayTime(newArray);
  if (!availableTime) return;

  if (newArray) {
    console.log(newArray);
    if (availableTime !== 'day-whole' && newArray.length === 1) newArray.unshift(defaultRecord); // newArray = newArray.concat(defaultRecord);

    newArray = [...newArray].map((item) => {
      if (item.type === 'day-ordinary') {
        newDuration = shiftToNext(item.duration, remainingYasumi, availableTime);
        weight = resolveNewWeight(item.duration, newDuration);
        return { ...item, duration: newDuration };
      }
      return { ...item };
    });

    newArray = newArray.filter(({ duration }) => Boolean(duration));

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
    setSavedRecords,
    setRemainingYasumi,
    setYasumiRecords,
    setSnackType,
    setSnackOpen,
  });
};

export default yasumiChangeHandler;

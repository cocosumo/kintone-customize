/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { yasumiRecToObj, yasumiUsed } from '../backend/yasumiKanri';

const refetchData = async ({
  currentMonth,
  setYasumiRecords,
  setRemainingYasumi,
  savedRecords,
  maxYasumi,
  caller,
}) => {
  console.log(savedRecords, 'refetched', caller);
  const yasumiObjs = await yasumiRecToObj(currentMonth.current);

  ReactDOM.unstable_batchedUpdates(() => {
    setRemainingYasumi(maxYasumi.current - yasumiUsed(yasumiObjs));
    setYasumiRecords(yasumiObjs);
    savedRecords.current = yasumiObjs;
  });
};

export default refetchData;

/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { yasumiRecToObj, yasumiUsed } from '../backend/yasumiKanri';

const refetchData = async ({
  currentMonth,
  setYasumiRecords,
  setRemainingYasumi,
  savedRecords,
  maxYasumi,
}) => {
  const yasumiObjs = await yasumiRecToObj(currentMonth.current);
  console.log(yasumiObjs);
  savedRecords.current = yasumiObjs;
  ReactDOM.unstable_batchedUpdates(() => {
    setRemainingYasumi(maxYasumi.current - yasumiUsed(yasumiObjs));
    setYasumiRecords(yasumiObjs);
  });
};

export default refetchData;

/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { yasumiRecToObj, yasumiUsed } from '../backend/yasumiKanri';

const refetchData = async ({
  currentMonth,
  setYasumiRecords,
  setRemainingYasumi,
  setSavedRecords,
  maxYasumi,
}) => {
  const yasumiObjs = await yasumiRecToObj(currentMonth.current);

  ReactDOM.unstable_batchedUpdates(() => {
    setRemainingYasumi(maxYasumi.current - yasumiUsed(yasumiObjs));
    setYasumiRecords(yasumiObjs);
    setSavedRecords(yasumiObjs);
  });
};

export default refetchData;

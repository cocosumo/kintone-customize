import { yasumiRecToObj } from '../backend/yasumiKanri';

const refetchData = async ({ currentMonth, setYasumiRecords, setSavedRecords }) => {
  const yasumiObjs = await yasumiRecToObj(currentMonth.current);
  setYasumiRecords(yasumiObjs);
  setSavedRecords(yasumiObjs);
};

export default refetchData;

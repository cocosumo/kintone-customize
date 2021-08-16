import { setFieldShown } from '../../../kintone-api/api';

const initialize = () => {
  setFieldShown('scheduleTable', false);
};

const onTest = (event) => {
  initialize();

  return event;
};

export default onTest;

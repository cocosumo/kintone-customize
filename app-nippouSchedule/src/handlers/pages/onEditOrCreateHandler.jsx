/* eslint-disable no-param-reassign */
import { setFieldShown } from '../../../../kintone-api/api';
import renderApp from '../../components/roots/renderApp';

import { fetchReportOnDate } from '../../backend/fetchSchedule';

import './body.css';
import { redirectToRecordId } from '../../helpers/DOM';

const DEBUG_MODE = false;

const initialize = ({ record }) => {
  const { reportDate, scheduleType } = record;

  setFieldShown('reportTable', DEBUG_MODE);
  reportDate.disabled = !DEBUG_MODE;
  scheduleType.disabled = !DEBUG_MODE;

  setFieldShown('plansTable', DEBUG_MODE);

  /* if (type.includes('create')) {
    scheduleType.value = resolveSchedType(reportDate.value);
  } */
};

const checkExistingRecord = async ({
  type, record: { reportDate },
}) => {
  if (type.includes('create')) {
    const existingRecord = (await fetchReportOnDate(reportDate.value)).records[0];

    const isExist = Boolean(existingRecord);
    if (isExist) {
      const { $id: { value: recordId } } = existingRecord;
      redirectToRecordId(recordId);
    }
  }
};

const onEditOrCreateHandler = (event) => {
  initialize(event);
  checkExistingRecord(event);
  renderApp(event);
  return event;
};

export default onEditOrCreateHandler;

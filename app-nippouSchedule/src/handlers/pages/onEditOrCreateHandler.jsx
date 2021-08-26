/* eslint-disable no-param-reassign */
import { setFieldShown } from '../../../../kintone-api/api';
import renderReportRoot from '../../components/roots/renderReportRoot';
import { resolveSchedType } from '../../helpers/Time';
import { fetchSchedOnDateAndPlan } from '../../backend/fetchSchedule';

import './body.css';
import { redirectToRecordId } from '../../helpers/DOM';

const DEBUG_MODE = false;

const initialize = ({ record, type }) => {
  const { reportDate, scheduleType } = record;

  setFieldShown('reportTable', DEBUG_MODE);
  reportDate.disabled = !DEBUG_MODE;
  scheduleType.disabled = !DEBUG_MODE;

  if (type.includes('create')) {
    scheduleType.value = resolveSchedType(reportDate.value);
  }
};

const checkExistingRecord = async ({
  type, record: { scheduleType, reportDate },
}) => {
  if (type.includes('create')) {
    const existingRecord = await fetchSchedOnDateAndPlan(reportDate.value, scheduleType.value);
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

  renderReportRoot(event);
  return event;
};

export default onEditOrCreateHandler;

/* eslint-disable no-param-reassign */
import { setFieldShown } from '../../../../kintone-api/api';
import renderReportRoot from '../../components/roots/renderReportRoot';
import { resolveSchedType } from '../../helpers/Time';
import './body.css';

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

const onEditOrCreateHandler = (event) => {
  initialize(event);
  renderReportRoot(event);
  return event;
};

export default onEditOrCreateHandler;

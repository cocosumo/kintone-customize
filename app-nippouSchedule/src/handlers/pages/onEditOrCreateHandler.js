import { setFieldShown } from '../../../../kintone-api/api';
import renderReportRoot from '../../components/roots/renderReportRoot';

const DEBUG_MODE = false;

const initialize = () => {
  setFieldShown('reportTable', DEBUG_MODE);
};

const onEditOrCreateHandler = (event) => {
  initialize();
  renderReportRoot(event);
  return event;
};

export default onEditOrCreateHandler;

import { setFieldShown } from '../../../../kintone-api/api';
import renderReportRoot from '../../components/roots/renderReportRoot';

const initialize = () => {
  setFieldShown('reportTable', false);
};

const onEditOrCreateHandler = (event) => {
  initialize();
  renderReportRoot(event);
  return event;
};

export default onEditOrCreateHandler;

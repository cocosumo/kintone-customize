import { setFieldShown } from '../../../../kintone-api/api';
import renderReportRoot from '../../components/roots/renderReportRoot';
import './body.css';

const DEBUG_MODE = false;

const initialize = () => {
  setFieldShown('reportTable', DEBUG_MODE);
  console.log($('body').attr('style', ''));
};

const onEditOrCreateHandler = (event) => {
  initialize();
  renderReportRoot(event);
  return event;
};

export default onEditOrCreateHandler;

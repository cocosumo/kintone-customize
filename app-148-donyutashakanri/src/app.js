import {onEditOrCreate, onFieldChange, onIndexShow, onReportShow} from '../../kintone-api/api';
import onIndexShowHandler from './pages/onIndexShowHandler';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import {onFieldChangeHandler} from './pages/onFieldChangeHandler';
import onReportShowHandler from './pages/onReportShowHandler';
import fieldsWithVisibilitySideEffect from './helpers/visibilitySettings.json';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);

  kintone.events.on(onFieldChange(Object.keys(fieldsWithVisibilitySideEffect)), onFieldChangeHandler);

  kintone.events.on(onReportShow, onReportShowHandler);
})();

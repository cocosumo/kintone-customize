import {onEditOrCreate, onFieldChange, onIndexShow, onReportShow} from '../../kintone-api/api';
import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import onEditOrCreateHandler from './pageShowHandlers/onEditOrCreateHandler';
import {onFieldChangeHandler} from './pageShowHandlers/onFieldChangeHandler';
import onReportShowHandler from './pageShowHandlers/onReportShowHandler';
import fieldsWithVisibilitySideEffect from './helpers/visibilitySettings.json';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);

  // kintone.events.on(onFieldChange(Object.keys(fieldsWithVisibilitySideEffect)), onFieldChangeHandler);

  kintone.events.on(onReportShow, onReportShowHandler);
})();

import {onEditOrCreate, onFieldChange, onIndexShow, onReportShow} from '../../kintone-api/api';
import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import onEditOrCreateHandler from './pageShowHandlers/onEditOrCreateHandler';
import onReportShowHandler from './pageShowHandlers/onReportShowHandler';
import onUpdateTekiyoNengatsuHandler from './pageShowHandlers/fieldChanges/onUpdateTekiyoNengatsuHandler';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);

  kintone.events.on(onReportShow, onReportShowHandler);

  kintone.events.on(onFieldChange(['適用年', '適用月']), onUpdateTekiyoNengatsuHandler);
})();

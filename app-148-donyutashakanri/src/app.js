import {onEditOrCreate, onFieldChange, onIndexShow, onReportShow} from '../../kintone-api/api';
import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import onEditOrCreateHandler from './pageShowHandlers/onEditOrCreateHandler';
import onReportShowHandler from './pageShowHandlers/onReportShowHandler';
// import visibilitySettings from './../src/helpers/visibilitySettings.json';
// import {setVisibility} from '../../app-module-visibility/src/helpers/visibility';
import onUpdateTekiyoNengatsuHandler from './pageShowHandlers/fieldChanges/onUpdateTekiyoNengatsuHandler';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);

  /*   kintone.events.on(
    onFieldChange(Object.keys(visibilitySettings)).concat(onEditOrCreate),
    (event) => setVisibility(event, visibilitySettings)
  ); */

  kintone.events.on(onReportShow, onReportShowHandler);

  kintone.events.on(onFieldChange(['適用年', '適用月']), onUpdateTekiyoNengatsuHandler);
})();

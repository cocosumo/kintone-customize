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

  /**
   * 設定オブジェクト（JSONなど）をもとにフィールド表示・非表示設定にする
   * 発火： edit, create, change (設定オブジェクトに定義したフィールド)
   * */
  /*   kintone.events.on(
    onFieldChange(Object.keys(visibilitySettings)).concat(onEditOrCreate),
    (event) => setVisibility(event, visibilitySettings)
  ); */

  kintone.events.on(onReportShow, onReportShowHandler);

  kintone.events.on(onFieldChange(['適用年', '適用月']), onUpdateTekiyoNengatsuHandler);
})();

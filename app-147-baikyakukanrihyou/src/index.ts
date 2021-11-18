import {onEditOrCreate, onFieldChange, onIndexShow} from '../../kintone-api/typescript/typedAPI';
import onBaitaiSiteChangeHandler from './pages/onBaitaiSiteChangeHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(
    onFieldChange('媒体サイト_copy').concat(onEditOrCreate), onBaitaiSiteChangeHandler);
})();

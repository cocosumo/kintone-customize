import {onReportShow, onIndexShow} from '../../kintone-api/typescript/typedAPI';
import {onIndexShowHandler} from './handlers/kintone/onIndexShowHandler';
import {onPortalShowHandler} from './handlers/kintone/portalShow/onPortalShowHandler';
import onReportShowHandler from './handlers/kintone/reportShow/onReportShowHandler';
import {onPortalShow} from './helpers/events';


kintone.events.on(onPortalShow, onPortalShowHandler);
kintone.events.on(onIndexShow, onIndexShowHandler);
kintone.events.on(onReportShow, onReportShowHandler);
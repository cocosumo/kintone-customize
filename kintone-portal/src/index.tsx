import {onIndexShowHandler} from './handlers/kintone/onIndexShowHandler';
import {onPortalShowHandler} from './handlers/kintone/onPortalShowHandler';
import {onIndexShow, onPortalShow} from './helpers/events';

kintone.events.on(onPortalShow(), onPortalShowHandler);
kintone.events.on(onIndexShow(), onIndexShowHandler);

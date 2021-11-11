

import {onEditOrCreate, onFieldChange, onSubmit} from './../../kintone-api/typedAPI';
import onRecalculateHandler from './handlers/kintone/onRecalculateHandler';
import onSubmitHandler from './handlers/kintone/onSubmitHandler';


const recalculateEvents = onEditOrCreate.concat(onFieldChange(['ここすも担当者', 'ゆめてつ担当者']));


kintone.events.on(recalculateEvents, onRecalculateHandler);
kintone.events.on(onSubmit, onSubmitHandler);

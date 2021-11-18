

import {onEditOrCreate, onFieldChange, onSubmit} from '../../kintone-api/typescript/typedAPI';
import onRecalculateHandler from './handlers/kintone/onRecalculateHandler';
import onSubmitHandler from './handlers/kintone/onSubmitHandler';


const recalculateEvents = onEditOrCreate.concat(
  onFieldChange([
    'ここすも担当者',
    'ゆめてつ担当者',
    'ここすも店舗',
    'ゆめてつ店舗',
    'ポイント',
    'ここすも個人割合',
    'ゆめてつ個人割合',
    '項目'
  ])
);

kintone.events.on(recalculateEvents, onRecalculateHandler);
kintone.events.on(onSubmit, onSubmitHandler);

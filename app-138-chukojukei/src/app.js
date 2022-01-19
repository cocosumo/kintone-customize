import {onEditOrCreate, onFieldChange, onIndexShow} from '../../kintone-api/api';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';
import fieldsWithVisibilitySideEffect from './helpers/visibilitySettings.json';
import {onFieldChangeHandler} from './pages/onFieldChangeHandler';
import {complexityProcess} from './helpers/complexityProcess';

// 複雑な設定が必要なフィールド名のみ、処理を分けるために配列化する
const complexityFields = [
  '_101_01_甲区_所有権関係', '_101_01_乙区_所有権関係', '_103_02_9', '_103_02_10_1',
  '_202_未定1', '_202_未定2', '_202_未定3', '_202_未定4', '_202_未定5', '_202_未定6',
  '_112_施設選択1', '_112_施設選択2', '_112_施設選択3', '_112_施設選択4', '_112_施設選択5', '_112_施設選択6',
  '_112_整備予定1', '_112_整備予定2', '_112_整備予定3', '_112_整備予定4', '_112_整備予定5', '_112_整備予定6',
  '_112_配管01_1', '_112_配管03_1', '_112_配管04_1', '_112_配管05_1'
];

kintone.events.on(onIndexShow, onIndexShowHandler);

kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
kintone.events.on(onFieldChange(Object.keys(fieldsWithVisibilitySideEffect)), onFieldChangeHandler);

kintone.events.on(onFieldChange(complexityFields), complexityProcess); // 複雑なフィールドの表示設定

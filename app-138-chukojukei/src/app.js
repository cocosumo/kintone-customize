import {onEditOrCreate, onFieldChange, onIndexShow} from '../../kintone-api/api';
import onEditOrCreateHandler from './pages/onEditOrCreateHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';
import fieldsWithVisibilitySideEffect from './helpers/visibilitySettings.json';
import {onFieldChangeHandler} from './pages/onFieldChangeHandler';
import {complexityProcess} from './helpers/complexityProcess';

// 複雑な設定が必要なフィールド名のみ、処理を分けるために配列化する
const complexityFields = ['_000_02_土地・測量図'];

kintone.events.on(onIndexShow, onIndexShowHandler);


kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
kintone.events.on(onFieldChange(Object.keys(fieldsWithVisibilitySideEffect)), onFieldChangeHandler);

kintone.events.on(onFieldChange(complexityFields), complexityProcess); // onFieldChangeの引数は、objやarrayも可


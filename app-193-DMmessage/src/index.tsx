import onCreateHandler from './handlers/kintone/onCreateHandler';
import onDetailHandler from './handlers/kintone/onDetailHandler';
import onEditHandler from './handlers/kintone/onEditHandler';
// import onTest from './handlers/kintone/onTest';

/* const onIndexShow : string[] = [
  'app.record.index.show',
  'mobile.app.record.index.show',
]; */

const onEdit : string[] = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
];

const onCreate : string[] = [
  'app.record.create.show',
  'mobile.app.record.create.show',
];

const onDetail : string[] = [
  'app.record.detail.show',
  'mobile.app.record.detail.show'
];

// kintone.events.on(onIndexShow, onTest);
kintone.events.on(onEdit, onEditHandler);
kintone.events.on(onCreate, onCreateHandler);
kintone.events.on(onDetail, onDetailHandler);

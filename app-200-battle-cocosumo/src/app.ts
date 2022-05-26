import {
  onCreateSubmitSuccess,
  onIndexShow,
  // onEditOrCreateSubmit,
  // onFieldChange
} from '../../kintone-api/api';
import onIndexShowHandler from './eventHandlers/onIndexShowHandler';
import onEditOrCreateSubmitSuccessHandler from './eventHandlers/onEditOrCreateSubmitSuccessHandler';
// import onEditOrCreateSubmitHandler from './eventHandlers/onCreateOrEditSubmitHandler';
// import {onChangeAGHandler} from './eventHandlers/onChangeAGHandler';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  // kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
  // kintone.events.on(onFieldChange(['担当者'] as Array<keyof KintoneTypes195.SavedRecord>), onChangeAGHandler);
  kintone.events.on(onCreateSubmitSuccess, onEditOrCreateSubmitSuccessHandler);
})();

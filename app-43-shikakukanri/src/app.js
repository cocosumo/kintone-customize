import { onEditOrCreate, onFieldChange, onIndexShow } from '../../kintone-api/api';
import choiceHandler from './handlers/choiceHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';

const test = () => {
  kintone.api('/k/api/people/user/list', 'POST', {}).then(
    ({ result }) => console.log(result),
  );
};

(() => {
  test();

  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate.concat(onFieldChange('qualificationChoices')), choiceHandler);
})();

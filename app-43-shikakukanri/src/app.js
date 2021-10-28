import {onEditOrCreate, onFieldChange, onIndexShow} from '../../kintone-api/api';
import choiceHandler from './handlers/choiceHandler';
import onIndexShowHandler from './pages/onIndexShowHandler';
import './assets/styles.css';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate.concat(onFieldChange('qualificationChoices')), choiceHandler);
})();

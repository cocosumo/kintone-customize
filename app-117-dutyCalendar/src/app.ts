
import {onEditOrCreate, onSubmit} from '../../kintone-api/api';
import onEditOrCreateHandler from './handlers/kintone/onEditOrCreateHandler';
import onSubmitHandler from './handlers/kintone/onSubmitHandler';

kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
kintone.events.on(onSubmit, onSubmitHandler);

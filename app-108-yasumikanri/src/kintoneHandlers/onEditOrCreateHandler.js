import { setFieldShown } from '../../../kintone-api/api';
import showCummulativeLeaves from '../renderMethods/showCummulativeLeaves';
import { setReasonShown } from './eventHandlers/onTypeChangeHandler';

const onEditOrCreateHandler = (event) => {
  setFieldShown('employeeNumber', false);
  setReasonShown(event.record);
  showCummulativeLeaves(event.record);
  return event;
};

export default onEditOrCreateHandler;

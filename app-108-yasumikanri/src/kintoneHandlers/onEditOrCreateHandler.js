import { setFieldShown } from '../../../kintone-api/api';
import { isAdministrator } from '../backend/user';
import showCummulativeLeaves from '../renderMethods/showCummulativeLeaves';
import { setReasonShown } from './eventHandlers/onTypeChangeHandler';

const onEditOrCreateHandler = async (event) => {
  if (!(await isAdministrator())) {
    setFieldShown('employeeNumber', false);
  }

  setReasonShown(event.record);
  showCummulativeLeaves(event.record);
  return event;
};

export default onEditOrCreateHandler;

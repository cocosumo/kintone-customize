import { setFieldShown } from '../../../kintone-api/api';
import showCummulativeLeaves from '../renderMethods/showCummulativeLeaves';

const onEditOrCreateHandler = (event) => {
  setFieldShown('employeeNumber', false);
  showCummulativeLeaves(event.record);
  return event;
};

export default onEditOrCreateHandler;

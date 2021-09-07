import { setFieldShown } from '../../../kintone-api/api';

const onEditOrCreateHandler = (event) => {
  setFieldShown('employeeNumber', false);

  return event;
};

export default onEditOrCreateHandler;

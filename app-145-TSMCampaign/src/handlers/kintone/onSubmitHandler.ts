import {recalculateAll} from '../../helpers/calculate';
import {deleteEmptyAgentRows} from '../../helpers/cleaning';
import {getValidationErrors} from '../../helpers/validation';
import sendToChatWork from '../../externalAPI/sendToChatWork';

const onSubmitHandler = (event: SaveFields) => {
  const {record} = event;
  let errorMessage : string = '';

  deleteEmptyAgentRows(event);
  recalculateAll(event);

  errorMessage += getValidationErrors(record);

  if (errorMessage?.length) {
    event.error = errorMessage;
  } else {
    sendToChatWork(event);
  }


  return event;
};

export default onSubmitHandler;
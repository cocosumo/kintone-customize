import {ratioValidation} from '../../helpers/validation';

const onSubmitHandler = (event: SaveFields) => {
  const {record} = event;
  const errorMessage = ratioValidation(record);

  if (errorMessage?.length) {
    event.error = errorMessage;
  }

  return event;
};

export default onSubmitHandler;
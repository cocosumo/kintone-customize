import {deleteEmptyAgentRows} from '../../helpers/cleaning';

const onFormDisplayHandler = (event : SaveFields) => {
  console.log('Deleting empty rows.');
  deleteEmptyAgentRows(event);

  return event;
};

export default onFormDisplayHandler;
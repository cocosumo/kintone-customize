import createSubmitConflict from '../../handlers/conflictHandlers/createSubmitConflict';

const onCreateSubmitHandler = async (event) => {
  createSubmitConflict(event);

  return event;
};

export default onCreateSubmitHandler;

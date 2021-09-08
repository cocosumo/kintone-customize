import createSaveConflict from '../../handlers/conflictHandlers/createSaveConflict';

const onCreateSubmitHandler = async (event) => {
  createSaveConflict(event);
};

export default onCreateSubmitHandler;

import checkForConflicts from '../../handlers/checkForConflicts';

const onEditOrCreateSubmitHandler = async (event) => {
  const errorMessage = await checkForConflicts(event);
  if (errorMessage) {
    event.error = errorMessage;
  }
  return event;
};

export default onEditOrCreateSubmitHandler;

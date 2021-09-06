import { findDuplicate, deleteRedundantRecords } from '../../backend/yasumiKanri';
import checkForConflicts from '../../handlers/checkForConflicts';

const onCreateSubmitHandler = async (event) => {
  const { record } = event;

  const errorMessage = await checkForConflicts(record);
  if (errorMessage) {
    event.error = errorMessage;
  }
  return event;
};

export default onCreateSubmitHandler;

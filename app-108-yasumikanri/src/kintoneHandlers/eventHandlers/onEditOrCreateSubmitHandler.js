import { fetchByYasumiDate } from '../../backend/yasumiKanri';
import checkForConflicts from '../../handlers/conflictHandlers/checkForConflicts';
import cleanRecords from '../../handlers/conflictHandlers/cleanRecords';
import { groupByDuration } from '../../handlers/conflictHandlers/conflictHelper';
import { normType } from '../../helpers/converters';
import messages from '../../helpers/messages';

const validateForm = (event) => {
  const { record } = event;
  const { reason, type } = record;

  if (!reason?.value && normType[type.value].includes('leave')) {
    event.error = messages.inputReason;
    reason.error = messages.inputReason;
    return false;
  }
  return true;
};

const validateConflict = async (event) => {
  const { record, type } = event;
  const {
    yasumiDate: { value: yasumiDate },
    type: { value: kinType },
    $id,
  } = record;
  let recordsObject = await fetchByYasumiDate(yasumiDate);

  if (type.includes('edit')) {
    recordsObject = recordsObject.filter(({ $id: resId }) => $id.value !== resId.value);
  }

  const groupedRecords = await groupByDuration(recordsObject);
  const conflictError = await checkForConflicts(record, groupedRecords);

  if (conflictError) {
    event.error = conflictError;
  } if (type.includes('create') && normType[kinType] === 'day-ordinary') {
    cleanRecords(recordsObject);
  }

  return event;
};

const onEditOrCreateSubmitHandler = async (event) => {
  const isValidForm = validateForm(event);
  if (isValidForm) {
    await validateConflict(event);
  }

  return event;
};

export default onEditOrCreateSubmitHandler;

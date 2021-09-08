import { fetchByYasumiDate } from '../../backend/yasumiKanri';
import checkForConflicts from '../../handlers/conflictHandlers/checkForConflicts';
import cleanRecords from '../../handlers/conflictHandlers/cleanRecords';
import { groupByDuration } from '../../handlers/conflictHandlers/conflictHelper';
import { normType } from '../../helpers/converters';

const onEditOrCreateSubmitHandler = async (event) => {
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
  } else if (type.includes('create')) {
    if (normType[kinType] === 'day-ordinary') {
      cleanRecords(recordsObject);
    }
  }

  return event;
};

export default onEditOrCreateSubmitHandler;

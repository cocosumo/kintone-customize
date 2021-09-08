import { fetchByYasumiDate } from '../../backend/yasumiKanri';
import checkForConflicts from '../../handlers/conflictHandlers/checkForConflicts';
import { groupByDuration } from '../../handlers/conflictHandlers/conflictHelper';
import { normType } from '../../helpers/converters';

const debug = true;

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
  console.log(conflictError, type);

  if (conflictError) {
    event.error = debug ? 'hello' : conflictError;
  } else if (type.includes('create')) {
    console.log(normType[kinType]);
  }

  return event;
};

export default onEditOrCreateSubmitHandler;

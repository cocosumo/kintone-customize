import { getGroupByDurationWithDate, getGroupByTypeWithDate } from '../../handlers/conflictHandlers/conflictHelper';
import createSubmitConflict from '../../handlers/conflictHandlers/createSubmitConflict';

const debug = false;

const onEditOrCreateSubmitHandler = async (event) => {
  const { record, type } = event;
  const {
    yasumiDate: { value: yasumiDate },
    $id,
  } = record;

  const groupedRecords = await getGroupByDurationWithDate(yasumiDate);
  const conflictError = await createSubmitConflict(record, groupedRecords);

  event.error = debug ? 'hello' : conflictError;
  return event;
};

export default onEditOrCreateSubmitHandler;

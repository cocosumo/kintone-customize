import messages from '../../helpers/messages';
import { normDuration, normType } from '../../helpers/converters';

const createSubmitConflict = async (record, groupedRecords) => {
  const {
    duration: { value: kinDuration },
  } = record;

  switch (normDuration[kinDuration]) {
    case 'day-whole':
      if (Object.keys(groupedRecords).reduce(
        (accu, curr) => accu + groupedRecords[curr].length, 0,
      ) > 0) {
        return messages.withConflict;
      }
      break;
    case 'day-am':
      if ((groupedRecords['day-whole'].length + groupedRecords['day-am'].length) > 0) {
        return messages.withConflict;
      }
      break;
    case 'day-pm':
      if ((groupedRecords['day-whole'].length + groupedRecords['day-pm'].length) > 0) {
        return messages.withConflict;
      }
      break;
    default:
      break;
  }

  return null;
};

export default createSubmitConflict;

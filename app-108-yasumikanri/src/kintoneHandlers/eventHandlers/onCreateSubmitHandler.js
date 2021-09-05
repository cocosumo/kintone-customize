import { findDuplicate, deleteRedundantRecords } from '../../backend/yasumiKanri';

const checkForDuplicates = async (record) => {
  const {
    yasumiDate: { value: yasumiDate },
    type: { value: type },
  } = record;

  const duplicateRecords = await findDuplicate({
    yasumiDate,
    type,
  });

  deleteRedundantRecords(duplicateRecords);

  if (duplicateRecords.length) {
    return duplicateRecords[0];
  }

  return false;
};

const checkForConflicts = async (record) => {
  console.log(record);
  // Gather all data in the date
  /*
    calculate data
   */
};

const onCreateSubmitHandler = (event) => {
  const { record } = event;

  // if (day-ordinary)
  /*  checkForConflict
   */
  // if (day-leave)
  // if (day special)
  checkForDuplicates(record);
  checkForConflicts(record);

  return true;
};

export default onCreateSubmitHandler;

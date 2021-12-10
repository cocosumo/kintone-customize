import getConflictReservations from '../helper/getConflictReservations';
import {showCantReserveError} from '../helper/showAlert';
import isValidTimeDuration from '../helper/validations/isValidTimeDuration';


const onEditOrCreateSubmitHandler = async (event) => {
  const {record} = event;
  const {
    開始,
    終了,
  } = record;

  let conflictReservations;
  let isWithConflict = false;
  console.log('dates', 開始, 終了);

  if (開始.value && 終了.value) {
    conflictReservations = await getConflictReservations(record, true);

    isWithConflict = conflictReservations.records.length > 0;
  }


  console.log('conflictssss', conflictReservations);

  const isValid = !isWithConflict && isValidTimeDuration(開始.value, 終了.value);

  if (!isValid) showCantReserveError();

  return isValid;
};

export default onEditOrCreateSubmitHandler;

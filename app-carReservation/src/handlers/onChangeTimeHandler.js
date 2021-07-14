import fetchCars, { getCarNumbers } from '../backend/fetchCars';
import { fetchConflict } from '../backend/fetchReservations';
import getUniqueValues, { arrayDiff } from '../helper/recordOperations';
import isValidTimeDuration from '../helper/validations/isValidTimeDuration';

fetchCars();

const updateAvailableCars = ({ records }) => {
  const allCars = getCarNumbers();
  const unavailableCars = getUniqueValues(records, '号車');
  const availableCars = arrayDiff(allCars, unavailableCars);

  console.log(allCars, unavailableCars, availableCars);
};

const showAvailableCars = (start, end) => {
  const s = start;
  const e = end;
  const isValid = isValidTimeDuration(start.value, end.value);

  if (isValid) {
    console.log('Retrieving available cars.');
    fetchConflict(s.value, e.value, updateAvailableCars);
  } else {
    console.log('Invalid Date.');
    e.value = s.value;
  }
};

const onChangeTimeHandler = (event) => {
  console.log('Changed time.');
  const { record } = event;
  const { 開始: start, 終了: end } = record;
  showAvailableCars(start, end);
  return event;
};

export default onChangeTimeHandler;

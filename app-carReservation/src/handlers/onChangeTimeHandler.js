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

const onChangeTimeHandler = (event) => {
  console.log('Changed time.');
  const { record } = event;
  const { 開始: start, 終了: end } = record;
  const isValid = isValidTimeDuration(start.value, end.value);

  if (isValid) {
    console.log('Retrieving available cars.');

    fetchConflict(start.value, end.value, updateAvailableCars);
  } else {
    console.log('Invalid Date.');
    end.value = start.value;
  }

  return event;
};

export default onChangeTimeHandler;

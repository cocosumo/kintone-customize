import { getCarNumbers, getCars } from '../backend/fetchCars';
import { fetchConflictByDate } from '../backend/fetchReservations';
import getUniqueValues, { arrayDiff } from '../helper/recordOperations';
import isValidTimeDuration from '../helper/validations/isValidTimeDuration';

const resolveAvailableCars = ({ records }) => {
  const allCarNumbers = getCarNumbers();
  const unavailableCars = getUniqueValues(records, '号車');
  const availableCars = arrayDiff(allCarNumbers, unavailableCars);
  const allCars = getCars();

  return allCars.filter((car) => availableCars.includes(car[0]));
};

// const renderAvailableCars =

const showAvailableCars = async (start, end) => {
  const s = start;
  const e = end;
  const isValid = isValidTimeDuration(start.value, end.value);
  if (!isValid) {
    e.value = s.value;
  }

  const conflictReservations = await fetchConflictByDate(s.value, e.value);

  return resolveAvailableCars(conflictReservations);
};

const getAvailableCars = (event) => {
  const { record } = event;
  const { 開始: start, 終了: end } = record;
  const result = showAvailableCars(start, end);

  return result;
};

export default getAvailableCars;

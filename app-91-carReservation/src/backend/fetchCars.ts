const carsAppId = 38;

let cars: CarAppRecords;

/**
 *
 * @returns Fetch all cars
 */
const fetchCars = () => {
  console.log('Fetching cars.', carsAppId);
  const body = {
    app: carsAppId,
  };

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

/**
 * @deprecated
 */
export const getCarNumbers = () => cars.records.map(({号車}) => 号車.value);

/**
 * @deprecated
 */
export const getCars = () => cars.records.map(({号車, 店舗}) => ([号車.value, 店舗.value]));

export default fetchCars;

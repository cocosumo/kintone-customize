const carsAppId = 38;

let cars;

const successHandler = (resp) => {
  cars = resp;
};

const errorHandler = (error) => {
  console.warn(error);
};

const fetchCars = () => {
  console.log('Fetching cars.', carsAppId);
  const body = {
    app: carsAppId,
  };

  kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
    successHandler,
    errorHandler,
  );
};

export const getCarNumbers = () => cars.records.map(({ 号車 }) => 号車.value);
export const getCars = () => cars.records.map(({ 号車, 店舗 }) => ([号車.value, 店舗.value]));
export default fetchCars;

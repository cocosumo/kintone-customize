import { getAppId } from '../../../kintone-api/api';

const errorHandler = (error) => {
  console.warn(error);
};

const fetchReservations = (successHandler) => {
  const body = {
    app: getAppId(),
  };

  kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
    successHandler,
    errorHandler,
  );
};

export const fetchConflict = (start, end, successHandler) => {
  console.log(start, end, successHandler);
  const body = {
    app: getAppId(),
    query: `開始 <= "${end}" and 終了 >= "${start}" `,
  };

  kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
    successHandler,
    errorHandler,
  );
};

export default fetchReservations;

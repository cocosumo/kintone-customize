import { getAppId } from '../../../kintone-api/api';

const successHandler = (resp) => {
  console.log(resp);
};

const errorHandler = (error) => {
  console.warn(error);
};

const fetchReservations = () => {
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

export const fetchConflict = async (start, end) => {
  const body = {
    app: getAppId(),
    query: `開始 <= "${end}" and 終了 >= "${start}" `,
  };

  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

export default fetchReservations;

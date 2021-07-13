import { DateTime } from 'luxon';

const dt = DateTime;

const isValidTimeDuration = (start, end) => {
  console.log(start, end);
  console.log(dt.now());
};

export default isValidTimeDuration;

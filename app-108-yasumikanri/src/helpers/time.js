import { DateTime } from 'luxon';

export const ISOtoLux = (date) => DateTime.fromISO(date);

export const JSDToLux = (date) => DateTime.fromJSDate(date);

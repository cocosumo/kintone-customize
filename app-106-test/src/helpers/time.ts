import format from 'date-fns/format';

export const fromISOToTime = (ISO : string) : string => format(new Date(ISO), 'HH:mm');

export default fromISOToTime;

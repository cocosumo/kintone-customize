import format from 'date-fns/format';

export const fromISOToTime = (ISO : string) : string => {
  return format(new Date(ISO), 'HH:mm');
};

export default fromISOToTime;
import format from 'date-fns/format';
import ja from 'date-fns/locale/ja';

export const fromISOToTime = (ISO : string) : string => {
  return format(new Date(ISO), 'HH:mm');
};

export const fromISOToFullDate = (ISO: string) : string => {
  return format(new Date(ISO), 'yyyy.M.d', {locale: ja});
};

export default fromISOToTime;
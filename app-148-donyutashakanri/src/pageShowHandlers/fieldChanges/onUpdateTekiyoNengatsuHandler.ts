import parse from 'date-fns/parse';
import jaLocale from 'date-fns/locale/ja';
import {format} from 'date-fns';

const onUpdateTekiyoNengatsuHandler = (event : KintoneEditCreateEvent) => {
  const {record} = event;
  const {適用年, 適用月, 適用年月} = record;

  適用年月.value = format(
    parse(適用年.value + 適用月.value, 'yyyy年MM月', new Date()),
    'yyyy-MM-dd',
    {locale: jaLocale}
  );

  return event;
};

export default onUpdateTekiyoNengatsuHandler;
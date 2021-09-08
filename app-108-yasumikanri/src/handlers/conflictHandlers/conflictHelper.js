import { fetchByYasumiDate } from '../../backend/yasumiKanri';
import { getKintoneYasumiWeight, normDuration, normType } from '../../helpers/converters';

export const getDate = (record) => record.yasumiDate.value;
export const getDuration = (record) => record.duration.value;
export const getType = (record) => record.type.value;
export const getId = (record) => record.$id.value;

export const groupByType = (recsByDate) => recsByDate.reduce((
  accu,
  curr,
) => {
  const {
    duration: { value: duration },
    type: { value: type },
  } = curr;

  const yasumiWeight = getKintoneYasumiWeight(duration);

  accu.total += yasumiWeight;
  accu[normType[type]].total += yasumiWeight;
  accu[normType[type]].records = accu[normType[type]].records.concat(curr);
  return accu;
}, {
  total: 0,
  'day-ordinary': { total: 0, records: [] },
  'day-leave': { total: 0, records: [] },
  'day-leaveSpecial': { total: 0, records: [] },
});

export const getGroupByTypeWithDate = async (
  yasumiDate,
) => groupByType(await fetchByYasumiDate(yasumiDate));

export const groupByDuration = (recsByDate) => recsByDate.reduce((
  accu, curr,
) => {
  const {
    duration: { value: duration },
    type: { value: type },
    $id: { value: id },
  } = curr;

  accu[normDuration[duration]].push({ duration: normDuration[duration], type: normType[type], id });

  return accu;
}, {
  'day-whole': [],
  'day-am': [],
  'day-pm': [],
});

export const getGroupByDurationWithDate = async (
  yasumiDate,
) => groupByDuration(await fetchByYasumiDate(yasumiDate));

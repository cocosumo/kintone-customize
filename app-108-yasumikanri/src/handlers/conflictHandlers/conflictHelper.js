import { fetchByYasumiDate } from '../../backend/yasumiKanri';

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

export default conflictHelper = 'conflictHelper';

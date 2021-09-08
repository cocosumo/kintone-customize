import { fetchByYasumiDate } from '../../backend/yasumiKanri';
import { getGroupByTypeWithDate } from './conflictHelper';

const createSaveConflict = async (event) => {
  const { record, type } = event;
  const {
    yasumiDate: { value: yasumiDate },
    $id,
  } = record;

  const groupedRecords = await getGroupByTypeWithDate(yasumiDate);

  console.log(groupedRecords);

  /*  const {
    yasumiDate: { value: yasumiDate },
    $id,
  } = record;
  let recsByDate = await fetchByYasumiDate(yasumiDate);
  if (isEdit) {
    recsByDate = recsByDate.filter(({ $id: resId }) => $id.value !== resId.value);
  }

  const groupedRecords = groupByType(recsByDate);
  const {
    total: totalWeight,
    'day-ordinary': { total: totalOrdinary, records: recsOrdinary },
    'day-leave': { total: totalLeave, records: recsLeave },
    'day-leaveSpecial': { total: totalLeaveSpecial, records: recsLeaveSpecial },
  } = groupedRecords; */
};

export default createSaveConflict;

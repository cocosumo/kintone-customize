import deleteRecords from '../../../../kintone-api/deleteRecords';
import { normType } from '../../helpers/converters';

/* Removes duplicate day-original, incomplete */
const cleanRecords = (records) => {
  const dayOrdinaryIds = records.reduce((accu, curr) => {
    const { $id, type } = curr;
    if (normType[type.value] === 'day-ordinary') {
      accu.push($id.value);
    }
    return accu;
  }, []);

  deleteRecords({ ids: dayOrdinaryIds });
};

export default cleanRecords;

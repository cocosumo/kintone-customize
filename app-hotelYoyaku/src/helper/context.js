/* 当プロジェクトで再利用する関数。 */

import { disableTableColumns } from './disableFields';
import addNumberingToTable from './addNumberingToTable';

const renderRoomsTable = (record) => {
  const { 部屋: table } = record;
  const fields = '部屋数';
  console.log(record);
  disableTableColumns(table, fields);
  addNumberingToTable(table, fields);
};

export default renderRoomsTable;



/**
 * Deletes empty rows based on field.
 *
 * @param {Table} table Table to be cleaned.
 * @param fieldName fieldname as basis of empty row.
 */
export const deleteEmptyRows = (table : Table, fieldName : string) => {
  const {value: rows} = table;

  for (let i = rows.length - 1; i >= 0; i--) {
    const {value: row} = rows[i];
    if (!row[fieldName].value) {
      rows.splice(i, 1);
    }
  }

};

export const deleteEmptyAgentRows = (event: SaveFields) => {
  const {record} = event;
  deleteEmptyRows(record.ゆめてつ担当者, 'ゆめてつ担当者名');
  deleteEmptyRows(record.ここすも担当者, 'ここすも担当者名');

};
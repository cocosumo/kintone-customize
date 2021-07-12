const disableFields = (record, fields) => {
  fields.forEach((item) => {
    record[item].disabled = true;
  });
};

export const disableTableColumns = (table, columns) => {
  console.log(table);
  const arrColumns = [].concat(columns);
  const { value: rows } = table;

  rows.forEach(({ value: row }) => {
    arrColumns.forEach((column) => {
      row[column].disabled = true;
    });
  });
};

export default disableFields;

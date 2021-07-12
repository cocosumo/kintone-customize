const addNumberingToTable = (table, column) => {
  const { value: rows } = table;
  rows.forEach(({ value: row }, index) => {
    row[column].value = index + 1;
  });
};

export default addNumberingToTable;

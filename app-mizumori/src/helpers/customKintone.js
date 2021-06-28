/* Returns Column Array
*  Status: Coding
*/
export const rowsToColumns = (table) => {
  console.log('processing table');
  const {value: tableContents} = table[0];
  /* Build the Result varariable */
  const result = Object.keys(tableContents)
      .reduce((acc, curr)=> (acc[curr]=[], acc), {});

  /* Map table to result */
  table.forEach(({value: row}) => {
    console.log(row);
  });
  console.log(result);
  return;
};

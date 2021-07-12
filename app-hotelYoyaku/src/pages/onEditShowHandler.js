/* eslint-disable no-unused-vars */
const onEditShowHandler = (event) => {
  const {
    record: {
      部屋: {
        value: tableRows,
      },
    },
  } = event;

  console.log('Edit Page');
  console.log(event);
  console.log(tableRows);
};

export default onEditShowHandler;

export const getChangedFieldDetails = (event) => {
  const {
    changes: {field},
    type
  } = event;


  return {
    fieldCode: type.split('change.')[1],
    choice: field.value
  };
};
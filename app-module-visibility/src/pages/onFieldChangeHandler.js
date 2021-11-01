export const onFieldChangeHandler = (event) => {
  const {changes: {field}} = event;
  console.log(Object.getOwnPropertyNames(field));
  field.disabled = true;


  return event;
};
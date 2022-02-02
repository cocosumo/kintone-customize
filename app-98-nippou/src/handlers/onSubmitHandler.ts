import { timeTo24Format } from '../helpers/Time';
import { KintoneTable } from '../types/globals';

const fieldValue = (type, value) => ({ type, value });

const convertToKintoneTable = (value, name) => {
  const result = value.map(({
    title, start, end, description,
  }) => ({
    id: null,
    value: {
      [`${name}ActionType`]: fieldValue('SINGLE_LINE_TEXT', title),
      [`${name}StartTime`]: fieldValue('TIME', timeTo24Format(start)),
      [`${name}EndTime`]: fieldValue('TIME', timeTo24Format(end)),
      [`${name}ActionDetails`]: fieldValue('SINGLE_LINE_TEXT', description),
    },
  }));

  return result;
};

const updateTable = (origContents : KintoneTable, newEvents, name) => {
  const newContents = convertToKintoneTable(newEvents, name);
  origContents.splice(0, origContents.length);
  newContents.forEach((el) => origContents.push(el));
  if (origContents.length > 0) {
    origContents.sort((a, b) => +(a.value[`${name}StartTime`].value.replace(':', '')) - +(b.value[`${name}StartTime`].value.replace(':', '')));
  }

  console.log(+(origContents[0].value[`${name}StartTime`].value.replace(':', '')));
  // console.log(Date.parse(origContents[0].value[`${name}Table`].value), name);
};

const onSubmitHandler = (event, newEvents, name) => {
  const { record } = event;
  const { [`${name}Table`]: { value: subTable } } = record;

  updateTable(subTable, newEvents, name);

  return event;
};

export default onSubmitHandler;

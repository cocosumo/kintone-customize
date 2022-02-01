import {timeTo24Format} from '../helpers/Time';

const fieldValue = (type, value) => ({type, value});

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

const updateTable = (origContents, newEvents, name) => {
  const newContents = convertToKintoneTable(newEvents, name);
  origContents.splice(0, origContents.length);
  newContents.forEach((el) => origContents.push(el));
};

const onSubmitHandler = (event, newEvents, name) => {
  const {record} = event;
  const {[`${name}Table`]: {value: subTable}} = record;

  updateTable(subTable, newEvents, name);

  return event;
};

export default onSubmitHandler;

import { timeTo24Format } from '../helpers/Time';

const fieldValue = (type, value) => ({ type, value });

const convertToKintoneTable = (value) => {
  const result = value.map(({
    title, start, end, description,
  }) => ({
    id: null,
    value: {
      actionType: fieldValue('SINGLE_LINE_TEXT', title),
      startTime: fieldValue('TIME', timeTo24Format(start)),
      endTime: fieldValue('TIME', timeTo24Format(end)),
      actionDetails: fieldValue('SINGLE_LINE_TEXT', description),
    },
  }));

  return result;
};

const updateTable = (origContents, newEvents) => {
  const newContents = convertToKintoneTable(newEvents);
  origContents.splice(0, origContents.length);
  newContents.forEach((el) => origContents.push(el));
};

const onSubmitHandler = (event, newEvents) => {
  const { record } = event;
  const { reportTable: { value: reportTable } } = record;

  updateTable(reportTable, newEvents);

  return event;
};

export default onSubmitHandler;

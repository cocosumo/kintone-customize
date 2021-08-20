const getValue = (selector) => {
  const prefix = selector.substring(0, 1);
  const s = selector.substring(1);
  let value;
  switch (prefix) {
    case '#':
      value = document.getElementById(s).value;
      break;
    default:
  }
  return value;
};

export const deleteEventById = (baseArray, modifiedId) => {
  const modifiedArray = [...baseArray];
  modifiedArray.splice(modifiedArray.findIndex(({ id }) => id === modifiedId), 1);

  return modifiedArray;
};

export const replaceEvent = (baseArray, newEvent, modifiedId) => [
  deleteEventById(baseArray, modifiedId), newEvent,
];

export default getValue;

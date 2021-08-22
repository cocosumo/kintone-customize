const getValue = (selector) => {
  const prefix = selector.substring(0, 1);
  const s = selector.substring(1);
  let value;
  switch (prefix) {
    case '#':
      value = document.getElementById(s).value || document.getElementById(s).innerText;
      break;
    default:
  }
  return value;
};

export const deleteEventById = (baseArray, modifiedId) => {
  const modifiedArray = [...baseArray];

  const index = baseArray.findIndex(({ id }) => id === modifiedId);
  modifiedArray.splice(index, 1);
  console.log(modifiedArray, baseArray);
  return modifiedArray;
};

export const replaceEvent = (baseArray, newEvent, modifiedId) => {
  const newState = [
    ...deleteEventById(baseArray, modifiedId),
    newEvent,
  ];

  return newState;
};

export default getValue;

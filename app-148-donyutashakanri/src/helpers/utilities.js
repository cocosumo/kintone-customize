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

export const createContainer = (selector, containerId = 'custom-space-element') => {
  console.log(selector, containerId);
  const DOMRoot = document.querySelector(selector);
  const container = document.createElement('div');
  container.id = containerId;

  DOMRoot.prepend(container);

  return document.getElementById(containerId);
};
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

export default getValue;

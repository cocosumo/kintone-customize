function props(obj) {
  const p = [];
  for (; obj != null; obj = Object.getPrototypeOf(obj)) {
    const op = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < op.length; i++) {
      if (p.indexOf(op[i]) === -1) p.push(op[i]);
    }
  }
  return p;
}

export const getChangedFieldDetails = (event) => {
  const {
    changes: {field},
    type
  } = event;

  console.log(props(field));
  return {
    fieldCode: type.split('change.')[1],
    choice: field.value
  };
};
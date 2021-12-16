export const groupRecordsByField = (
  records : {[key: string]: any},
  field : string
) => {
  const groupByField = records.reduce((accu : any, curr: any)=>{
    const _field = curr[field];

    const current = accu[_field.value];
    if (current) {
      current.push(curr);
      return {...accu, ...{[_field.value]: current}};
    }
    return {...accu, ...{[_field.value]: [curr]}};
  }, {});

  return groupByField;
};
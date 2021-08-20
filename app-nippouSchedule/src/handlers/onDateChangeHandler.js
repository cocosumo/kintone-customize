const onDateChangeHandler = ({ record }) => {
  // const { reportDate: { value: reportDate } } = record;
  const reportDate = record.reportDate.value;
  console.log(reportDate);
};

export default onDateChangeHandler;

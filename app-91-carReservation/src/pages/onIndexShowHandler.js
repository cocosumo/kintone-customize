const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page', event);
};

export default onIndexShowHandler;

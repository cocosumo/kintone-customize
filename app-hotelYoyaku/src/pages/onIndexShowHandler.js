/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);

  console.log('Index Page');
};

export default onIndexShowHandler;

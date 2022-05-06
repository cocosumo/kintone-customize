
const onIndexShowHandler = () => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Indexss Page');
};

export default onIndexShowHandler;

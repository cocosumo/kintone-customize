

const DetectedLabels = (props : {labels: any[]}) => {
  const {labels} = props;
  const foundObjects = labels.map(item => item.Name).join(', ');
  const caption = `そして、${labels.length}件の物を認識しました。(${foundObjects}, その他)`;

  console.log(labels, 'success');
  return (<div>{caption}</div>);
};

export default DetectedLabels;
import ReactDOM from 'react-dom';
import App from '../compornents/App';
import './index.css';

/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');

  // 課金一覧のカスタマイズ
  ReactDOM.render(
    <App event={event} />
    , document.getElementById('root')
  );
};

export default onIndexShowHandler;

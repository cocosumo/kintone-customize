import ReactDOM from 'react-dom';
import Table from '../compornents/Table';
import './index.css';

/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');

  // console.log('event', event);
  ReactDOM.render(
    <Table area={event.viewName} data={event.records} />
    , document.getElementById('root')
  );
};

export default onIndexShowHandler;

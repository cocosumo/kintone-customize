import ReactDOM from 'react-dom';
import Table from '../compornents/Table';
import ShowButton from '../compornents/ShowButton';
import {getHeaderMenuSpaceElement} from '../../../kintone-api/api';
import './index.css';

/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');

  // 導入他社数一覧のカスタマイズ report=5533636
  if (event.viewId !== 5533636) { // 導入他社数一覧(グラフ)ではないとき
    ReactDOM.render(
      <ShowButton>[導入他社数一覧]を表示する</ShowButton>, getHeaderMenuSpaceElement()
    );
  }
  if (event.viewId === 5533636) {
    ReactDOM.render(
      <ShowButton>[課金一覧]を表示する</ShowButton>, getHeaderMenuSpaceElement()
    );
  }

  // 課金一覧のカスタマイズ
  ReactDOM.render(
    <Table area={event.viewName} data={event.records} />
    , document.getElementById('root')
  );
};

export default onIndexShowHandler;

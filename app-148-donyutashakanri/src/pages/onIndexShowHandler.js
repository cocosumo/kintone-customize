import ReactDOM from 'react-dom';
import Table from '../compornents/Table';
import './index.css';
import YearMonthPicker from '../compornents/YearMonthPicker';
import ReactToPrint from 'react-to-print';
import PrintButton from '../compornents/PrintButton';
import React, {useRef} from 'react';

/* eslint-disable no-unused-vars */
const onIndexShowHandler = (event) => {
  const condition = kintone.app.getQueryCondition();
  console.log(condition);
  console.log('Index Page');

  // 導入他社数一覧のカスタマイズ report=5533636
  /* if (event.viewId !== 5533636) { // 導入他社数一覧(グラフ)ではないとき
    ReactDOM.render(<ShowButton>[導入他社数一覧]を表示する</ShowButton>, getHeaderMenuSpaceElement());
  } */

  // 課金一覧のカスタマイズ
  ReactDOM.render(
    <>
      <ReactToPrint
        trigger={() => <PrintButton onClick={window.print} />}
        content={() => useRef().current}
      /><br />
      <br />
      <YearMonthPicker
        reportDate={}
        setReportDate={}
      /><br />
      <br />
      <Table area={event.viewName} data={event.records} />
    </>
    , document.getElementById('root')
  );
};

export default onIndexShowHandler;

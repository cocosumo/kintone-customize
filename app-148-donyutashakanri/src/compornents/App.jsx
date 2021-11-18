import PropTypes from 'prop-types';
import YearMonthPicker from './YearMonthPicker';
import Table from './Table';
import ReactToPrint from 'react-to-print';
import PrintButton from './PrintButton';

import React, {useRef, useState} from 'react';
import {isSameMonth, parseISO} from 'date-fns';

const App = ({event}) => {

  const componentRef = useRef();
  const [reportDate, setReportDate] = useState(new Date());

  console.log('reportDate', reportDate);

  // recordsの更新 filtering
  const data = event.records.filter(({適用年月}) => isSameMonth(reportDate, parseISO(適用年月.value)));

  const vartype = typeof reportDate;
  console.log('vartype: ', vartype);
  console.log('data', data);

  return (
    <>
      <ReactToPrint
        trigger={() => <PrintButton onClick={window.print} />}
        content={() => componentRef.current}
      /><br />
      <br />
      <YearMonthPicker
        reportDate={reportDate}
        setReportDate={setReportDate}
      /><br />
      <br />
      <div ref={componentRef}>
        <Table area={event.viewName} data={data} />
      </div>
    </>
  );
};

App.propTypes = {
  event: PropTypes.object
};


export default App;

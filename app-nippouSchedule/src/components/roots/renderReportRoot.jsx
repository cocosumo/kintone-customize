import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';

import FullWidth from '../containers/FullWidth';
import EventsProvider from '../context/EventsProvider';
import MaterialReport from '../UI/MaterialReport';
// import Report from '../UI/Report';

const renderReportRoot = async (event) => {
  ReactDOM.render(
    <EventsProvider event={event}>
      <FullWidth>
        {/* <Report selectedDate={event.record.reportDate.value} /> */}
        <MaterialReport selectedDate={event.record.reportDate.value} />
      </FullWidth>
    </EventsProvider>,
    getSpaceElement('reportRoot'),

  );
};

export default renderReportRoot;

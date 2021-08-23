import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';

import FullWidth from '../containers/FullWidth';
import EventsProvider from '../context/EventsProvider';
import MaterialReport from '../UI/MaterialReport';

const renderReportRoot = async (event) => {
  ReactDOM.render(
    <EventsProvider event={event}>
      <FullWidth>
        <MaterialReport selectedDate={event.record.reportDate.value} />
      </FullWidth>
    </EventsProvider>,
    getSpaceElement('reportRoot'),

  );
};

export default renderReportRoot;

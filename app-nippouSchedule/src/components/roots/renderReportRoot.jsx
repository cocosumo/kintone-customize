import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';

import FullWidth from '../containers/FullWidth';
import EventsProvider from '../context/EventsProvider';
import Report from '../UI/Report';

const renderReportRoot = async (events) => {
  ReactDOM.render(
    <EventsProvider>
      <FullWidth>
        <Report events={events} />
      </FullWidth>
    </EventsProvider>,
    getSpaceElement('reportRoot'),

  );
};

export default renderReportRoot;

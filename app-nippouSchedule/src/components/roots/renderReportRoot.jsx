import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';
import FullWidth from '../containers/FullWidth';
import EventsProvider from '../../store/EventsProvider';
import MaterialReport from '../UI/MaterialReport';
import Title from '../UI/Title';
import { resolveTitle } from '../../helpers/FCUtils';

const renderReportRoot = async (event) => {
  const { record } = event;
  const title = resolveTitle(event);

  ReactDOM.render(
    <EventsProvider event={event}>
      <FullWidth>
        <Title>{title}</Title>
        <MaterialReport selectedDate={record.reportDate.value} />
      </FullWidth>
    </EventsProvider>,
    getSpaceElement('reportRoot'),
  );
};

export default renderReportRoot;

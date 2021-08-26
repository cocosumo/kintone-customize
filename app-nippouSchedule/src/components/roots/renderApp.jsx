import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';
import Schedule from '../widgets/Schedule';

const renderApp = async (event) => {
  ReactDOM.render(
    <Schedule event={event} name="report" />,
    getSpaceElement('reportRoot'),
  );

  ReactDOM.render(
    <Schedule event={event} name="plans" />,
    getSpaceElement('plansRoot'),
  );
};

export default renderApp;

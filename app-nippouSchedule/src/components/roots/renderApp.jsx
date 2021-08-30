import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';
import PlansDate from '../forms/PlansDate';
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

  ReactDOM.render(<PlansDate event={event} />, getSpaceElement('inform'));
};

export default renderApp;

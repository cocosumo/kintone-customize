import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';
import PlansDate from '../forms/PlansDate';
import Schedule from '../widgets/Schedule';

const renderSchedule = async (event, name, options) => {
  ReactDOM.render(
    <Schedule event={event} name={name} actionOptions={options} />,
    getSpaceElement(`${name}Root`),
  );
};

const renderApp = async (event) => {
  const options = JSON.parse(localStorage.getItem('選択肢'));

  renderSchedule(event, 'report', options);
  renderSchedule(event, 'plans', options);
  /* ReactDOM.render(
    <Schedule event={event} name="report" />,
    getSpaceElement('reportRoot'),
  ); */

  /*  ReactDOM.render(
    <Schedule event={event} name="plans" />,
    getSpaceElement('plansRoot'),
  ); */

  ReactDOM.render(<PlansDate event={event} />, getSpaceElement('inform'));
};

export default renderApp;

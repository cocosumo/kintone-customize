import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';
import PlansDate from '../forms/PlansDate';
import Schedule from '../widgets/Schedule';

const renderSchedule = async (event, name, options = JSON.parse(localStorage.getItem('選択肢'))) => {
  ReactDOM.render(
    <Schedule event={event} name={name} actionOptions={options} />,
    getSpaceElement(`${name}Root`),
  );
};

const renderApp = async (event) => {
  renderSchedule(event, 'report');
  renderSchedule(event, 'plans');

  ReactDOM.render(<PlansDate event={event} />, getSpaceElement('inform'));
};

export default renderApp;

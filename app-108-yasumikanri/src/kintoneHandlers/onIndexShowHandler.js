import {render} from 'react-dom';
import {getEmployeeNumber, getEmployeeRole} from '../backend/user';

import YasumiRegistry from '../components/forms/YasumiRegistry';
import GlobalTheme from '../components/themes/GlobalTheme';

const registrationViewId = 5523653;

const renderRegistration = async () => {
  console.log(getEmployeeNumber());
  localStorage.setItem('employeeRole', await getEmployeeRole());

  render(
    <GlobalTheme>
      <YasumiRegistry />
    </GlobalTheme>,
    document.getElementById('root'),
  );
};

const onIndexShowHandler = (event) => {
  const {viewId} = event;

  if (viewId === registrationViewId) {
    renderRegistration();
  }
};

export default onIndexShowHandler;

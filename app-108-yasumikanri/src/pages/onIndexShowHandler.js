import { render } from 'react-dom';

import YasumiRegistry from '../components/forms/YasumiRegistry';

const registrationViewId = 5523653;

const renderRegistration = async () => {
  render(<YasumiRegistry />, document.getElementById('root'));
};

const onIndexShowHandler = (event) => {
  const { viewId } = event;

  if (viewId === registrationViewId) { renderRegistration(); }
};

export default onIndexShowHandler;

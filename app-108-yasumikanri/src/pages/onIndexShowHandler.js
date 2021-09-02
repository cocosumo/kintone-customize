import { render } from 'react-dom';
import YasumiRegistry from '../forms/YasumiRegistry';
import getYasumiCount from '../backend/settings';

const registrationViewId = 5523653;

const renderRegistration = async () => {
  console.log(await getYasumiCount());
  render(<YasumiRegistry />, document.getElementById('root'));
};

const onIndexShowHandler = (event) => {
  const { viewId } = event;

  if (viewId === registrationViewId) { renderRegistration(); }
};

export default onIndexShowHandler;

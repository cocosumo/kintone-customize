import ReactDOM from 'react-dom';
import { getSpaceElement } from '../../../kintone-api/api';
import App from '../components/Roots/App';

const renderApp = () => {
  ReactDOM.render(<App />, getSpaceElement('formRepeat'));
};

const onEditOrCreateHandler = (event) => {
  console.log(event);
  renderApp();
};

export default onEditOrCreateHandler;

import ReactDOM from 'react-dom';
import App from '../compornents/App';
import './index.css';


/**
 * Render component based on viewId.
 *
 * @param {object} event object passed by the index.show event.
 *
 * @todo 仕様書？を日本語の訳も記述する。
 */
const renderRoot = (event) => {

  ReactDOM.render(
    <App event={event} />,
    document.getElementById('root')
  );

};

const onIndexShowHandler = (event) => {
  renderRoot(event);
};

export default onIndexShowHandler;

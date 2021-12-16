import ReactDOM from 'react-dom';
import App from '../compornents/App';
import './index.css';


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

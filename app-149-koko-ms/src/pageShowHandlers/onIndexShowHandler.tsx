import ReactDOM from 'react-dom';
import App from '../components/ui/App';

import {generateRoot} from '../helpers/utils';


export default function onIndexShowHandler() {
  console.log('hello');
  ReactDOM.render(<App />, generateRoot());
}
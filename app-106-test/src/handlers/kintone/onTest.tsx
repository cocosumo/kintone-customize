import TestComponent from '../../components/TestComponent';
import ReactDOM from 'react-dom';

const renderReactTest = () => {

  ReactDOM.render(<TestComponent />, kintone.app.getHeaderSpaceElement());
};

const onTest = (event : KintoneEvent) => {
  console.log('Test Success');

  renderReactTest();

  return event;
};

export default onTest;
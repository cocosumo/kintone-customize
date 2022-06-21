import TestComponent from '../../components/TestComponent';
import ReactDOM from 'react-dom';

const renderReactTest = () => {
  console.log(kintone.app.getHeaderSpaceElement());
  ReactDOM.render(<TestComponent />, kintone.app.getHeaderSpaceElement());
};

const onTest = (event : kintone.types.SavedFields) => {
  console.log('Test Success');

  renderReactTest();

  return event;
};

export default onTest;
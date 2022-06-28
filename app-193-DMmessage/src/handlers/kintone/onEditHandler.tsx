// import TestComponent from '../../components/TestComponent';
// import ReactDOM from 'react-dom';

/* const renderReactTest = () => {
  console.log(kintone.app.getHeaderSpaceElement());
  ReactDOM.render(<TestComponent />, kintone.app.getHeaderSpaceElement());
}; */

const onEditHandler = (event : kintone.types.SavedAppFields) => {
  console.log('onEdit Test');

  // renderReactTest();

  return event;
};

export default onEditHandler;
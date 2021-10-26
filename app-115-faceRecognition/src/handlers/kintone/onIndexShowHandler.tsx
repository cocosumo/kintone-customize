import TestComponent from '../../components/TestComponent';
import ReactDOM from 'react-dom';

interface kintoneIndex {
  viewName : string
  viewId: string
}

const resolveViewElement = (viewName : string) : JSX.Element => {
  switch (viewName) {
    case '年齢推測':
      return <TestComponent />;
      break;
    default:
      return <>Unable To Load</>;
      break;
  }

};


const renderView = (ViewComponent : JSX.Element) => {
  console.log(kintone.app.getHeaderSpaceElement());
  ReactDOM.render(ViewComponent, document.getElementById('root'));
};


const onIndexShow = (event : kintoneIndex) => {
  renderView(resolveViewElement(event.viewName));

  return event;
};

export default onIndexShow;
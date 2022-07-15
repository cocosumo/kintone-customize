import { createRoot } from 'react-dom/client';
import TestComponent from '../../components/TestComponent';
import '../../styles/index.css';

const renderReactTest = () => {
  const container = kintone.app.getHeaderSpaceElement();
  const root = createRoot(container!);
  root.render(<TestComponent />);
};

const onTest = (event : KintoneEvent) => {
  console.log('Test Success');

  renderReactTest();

  return event;
};

export default onTest;

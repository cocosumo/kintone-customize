import ReactDOM from 'react-dom';
import PrintButton from '../../../components/button/PrintButton';
import './reportShow.css';

export const generateToolBarContainer = () => {
  const subTotalButton = document.querySelector('.gaia-argoui-app-subtotalbutton');
  const printButtonContainer = document.createElement('div');
  printButtonContainer.classList.add('tool-container');

  printButtonContainer.id = 'print-container';
  subTotalButton?.parentNode?.insertBefore(printButtonContainer, subTotalButton.nextSibling);
  return document.getElementById('print-container');
};

export const renderPrint = () => {

  ReactDOM.render(
    <PrintButton />,
    generateToolBarContainer()
  );
};
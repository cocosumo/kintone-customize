import ReactDOM from 'react-dom';
import PrintGraphButton from '../../../components/button/PrintGraphButton';
import GraphTitle from '../../../components/headers/GraphTitle';
import './reportShow.css';

const generateToolBarContainer = () => {

  const subTotalButton = document.querySelector('.gaia-argoui-app-subtotalbutton');
  const printButtonContainer = document.createElement('div');
  printButtonContainer.classList.add('tool-container');

  printButtonContainer.id = 'print-container';
  subTotalButton?.parentNode?.insertBefore(printButtonContainer, subTotalButton.nextSibling);
  return document.getElementById('print-container');
};

const generateHeaderContainer = () => {

  const reportEl = document.querySelector('#view-list-gaia');
  const container = document.createElement('div');
  container.id = 'header-container';
  reportEl?.parentNode?.insertBefore(container, reportEl);
  return document.getElementById('header-container');
};

export const renderPrint = () => {
  if (document.getElementById('print-container')) return;

  const title = document.getElementsByClassName('gaia-argoui-app-viewtoggle-reports')[0].textContent || '';

  ReactDOM.render(
    <PrintGraphButton />,
    generateToolBarContainer()
  );

  ReactDOM.render(
    <GraphTitle {...{title}} />,
    generateHeaderContainer()
  );
};
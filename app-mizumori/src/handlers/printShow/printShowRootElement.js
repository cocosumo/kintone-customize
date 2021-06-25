import {getPrintViewHeader} from '../../kintone/api';

const printShowRootElement = () => {
  /* Generate and Return Root Element */
  const headerElement = getPrintViewHeader();
  const rootNode = document.createElement('span');
  rootNode.id = 'rootHeader';
  return headerElement.appendChild(rootNode);
};

export default printShowRootElement;

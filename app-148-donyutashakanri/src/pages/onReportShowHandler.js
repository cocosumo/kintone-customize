import ReactDOM from 'react-dom';
import {createContainer} from '../helpers/utilities';
import ReportGraphPage from '../compornents/pages/ReportGraphPage';

/**
 * Generates title on top of the report.
 *
 * @param {string} titleText the text of the title.
 * @return {void}
 */
const addTitle = (titleText) =>{
  const className = 'custom-title';

  const isTitleExist = Boolean(document.getElementsByClassName(className).length);

  if (!isTitleExist) {
    const reportEl = document.querySelector('#report-view-gaia > div:first-of-type');
    const title = document.createElement('div');
    title.append(titleText);
    title.classList.add(className);
    reportEl.prepend(title);
  }

};

const renderToolBar = () => {
  ReactDOM.render(
    <ReportGraphPage />,
    createContainer('.filter-contents-gaia')
  );

};

const onReportShowHandler = () => {

  addTitle('導入他社件数管理');
  renderToolBar();

};

export default onReportShowHandler;

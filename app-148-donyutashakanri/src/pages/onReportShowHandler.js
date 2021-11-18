import ReactDOM from 'react-dom';
import ShowButton from '../compornents/ShowButton';
import {getHeaderMenuSpaceElement} from '../../../kintone-api/api';
import {createContainer} from '../helpers/utilities';
import ReportGraphPage from '../compornents/pages/ReportGraphPage';

const onReportShowHandler = (event) => {
  console.log('reportShow', event);

  ReactDOM.render(
    <ReportGraphPage />,
    createContainer('#report-view-gaia')
  );


};

export default onReportShowHandler;

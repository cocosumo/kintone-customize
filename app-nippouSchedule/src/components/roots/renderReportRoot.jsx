import ReactDOM from 'react-dom';

import { getSpaceElement } from '../../../../kintone-api/api';

import FullWidth from '../containers/FullWidth';
import ReportTimeGrid from '../UI/ReportTimeGrid';

const renderReportRoot = async (event) => {
  ReactDOM.render(
    <FullWidth>
      <ReportTimeGrid />
    </FullWidth>, getSpaceElement('reportRoot'),
  );
};

export default renderReportRoot;

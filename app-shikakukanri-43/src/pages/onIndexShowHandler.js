/** ViewIds
 * 5520836 -> 宅建士＿社員人数割合い
*/

import ReactDOM from 'react-dom';
import { getEmployeeCountPerStore } from '../backend/fetchEmployees';
import { groupTakkenshiPerStore } from '../backend/fetchQualifications';
import RatioTable from '../widgets/RatioTable';

const renderRatioTable = async () => {
  ReactDOM.render(<RatioTable
    employeeCountPerStore={await getEmployeeCountPerStore()}
    takkenshiPerStore={await groupTakkenshiPerStore()}
  />, document.getElementById('root'));
};

const onIndexShowHandler = (event) => {
  const { viewId } = event;

  if (viewId === 5520836) {
    renderRatioTable();
  }
};

export default onIndexShowHandler;

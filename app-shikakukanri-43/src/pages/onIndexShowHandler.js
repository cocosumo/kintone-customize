/** ViewIds
 * 5520836 -> 宅建士＿社員人数割合い
*/

import ReactDOM from 'react-dom';
import { getEmployeeCountPerStore } from '../backend/fetchEmployees';
import { getTakkenshiCountPerStore, groupTakkenshiPerStore } from '../backend/fetchQualifications';
import RatioTable from '../widgets/RatioTable';

const renderRatioTable = async () => {
  console.log(await groupTakkenshiPerStore());

  ReactDOM.render(<RatioTable
    employeeCountPerStore={await getEmployeeCountPerStore()}
    takkenshiCountPerStore={await getTakkenshiCountPerStore()}
  />, document.getElementById('root'));
};

const onIndexShowHandler = (event) => {
  const { viewId } = event;
  if (viewId === 5520836) {
    renderRatioTable();
  }
};

export default onIndexShowHandler;

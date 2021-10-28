/**
 * ViewIds
 * 5520836 -> 宅建士＿社員人数割合い
*/

import ReactDOM from 'react-dom';
import {data} from '../backend/data';
import {getEmployeeCountPerStore} from '../backend/fetchEmployees';
import {groupTakkenshiPerStore} from '../backend/fetchQualifications';
import RatioTable from '../widgets/RatioTable';

const renderRatioTable = async () => {
  const dataProp = (await data());

  ReactDOM.render(
    <RatioTable
      employeeCountPerStore={dataProp.employeeCountPerStore}
      takkenshiPerStore={dataProp.groupTakkenshiPerStore}
    />, document.getElementById('root')
  );
};

const onIndexShowHandler = (event) => {
  const {viewId} = event;

  if (viewId === 5520836) {
    renderRatioTable();
  }
};

export default onIndexShowHandler;

import ReactDOM from 'react-dom';
import ShowButton from '../compornents/ShowButton';
import {getHeaderMenuSpaceElement} from '../../../kintone-api/api';

const onReportShowHandler = (event) => {
  console.log('reportShow', event);

  ReactDOM.render(
    <ShowButton>[課金一覧]を表示する</ShowButton>, getHeaderMenuSpaceElement()
  );


};

export default onReportShowHandler;

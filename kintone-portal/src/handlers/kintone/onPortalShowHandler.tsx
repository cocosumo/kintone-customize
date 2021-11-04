import {getActiveAnnouncements} from '../../backend/announcement';
import {getPortalSpaceElement} from '../../../../kintone-api/typedAPI';
import {Portal} from '../../components/Portal';
import ReactDOM from 'react-dom';

const rederPortal = () => {

  ReactDOM.render(<Portal />, getPortalSpaceElement());
};

export const onPortalShowHandler = async () => {

  rederPortal();
  console.log(await getActiveAnnouncements());
};
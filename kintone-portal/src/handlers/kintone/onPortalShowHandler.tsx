
import {getPortalSpaceElement} from '../../../../kintone-api/typedAPI';
import {Portal} from '../../components/Portal';
import ReactDOM from 'react-dom';

const rederPortal = () => {
  console.log(getPortalSpaceElement());
  ReactDOM.render(<Portal />, getPortalSpaceElement());
};

export const onPortalShowHandler = async () => {
  console.log('PORTAL');
  rederPortal();

};
import ReactDOM from 'react-dom';
import { getHeaderMenuSpaceElement } from '../../../kintone-api/api';
import Button from '../../../kintone-api/components/UI/Button';

const setToOwnCustomers = () => {
  const user = kintone.getLoginUser();
  const userName = user.name;
  const url = `https://rdmuhwtt6gx7.cybozu.com/k/84/?view=5522967&query=(担当名%20like%20"${userName}")`;
  window.location.href = url;
};

const onIndexShowHandler = (event) => {
  const { referrer } = document;
  const headerMenuSpace = getHeaderMenuSpaceElement(event.type);
  if (!referrer) setToOwnCustomers();

  $(headerMenuSpace).append('<div id=\'header-menu\'></div>');

  console.log($('#header-menu'));
  ReactDOM.render(
    <Button id="own-customer" onClickHandler={setToOwnCustomers}>
      自分の顧客
    </Button>,
    headerMenuSpace,
  );
  return event;
};

export default onIndexShowHandler;

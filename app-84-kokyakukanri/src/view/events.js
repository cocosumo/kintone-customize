import selectEmpOnChangeHandler from '../handlers/selectEmpOnChangeHandler';
import selectShopOnChangeHandler from '../handlers/selectShopOnChangeHandler';

import { mySelectEmp, mySelectShop } from './utilsDOM';

const addEvents = () => {
  mySelectShop().addEventListener('change', selectShopOnChangeHandler);
  mySelectEmp().addEventListener('change', selectEmpOnChangeHandler);
};

export default addEvents;

import { selectEmpOnChangeHandler, selectShopOnChangeHandler } from './eventHandlers';
import { mySelectEmp, mySelectShop } from './utilsDOM';

const addEvents = () => {
  mySelectShop().addEventListener('change', selectShopOnChangeHandler);
  mySelectEmp().addEventListener('change', selectEmpOnChangeHandler);
};

export default addEvents;

import { getAgentsByShop, getLocalAgents } from '../backend/fetchEmployees';
import { getLocalShops } from '../backend/fetchShop';
import { mySelectEmp, mySelectShop } from './utilsDOM';

export const selectEmpID = 'my_selectEmp';
export const selectShopID = 'my_selectShop';

export const addOptionsToSelect = (selectEl, list) => {
  const completeOptions = [
    ['【選択してください】', 'init'],
    ['全レコードを表示', 'listall'],
  ].concat(list.map((item) => ([item, item])));

  $(selectEl)
    .append(
      completeOptions.map(([text, val]) => new Option(text, val)),
    );
};

export const populateShopSelect = () => {
  addOptionsToSelect(mySelectShop(), getLocalShops());
};

export const populateEmpSelect = (list = getLocalAgents()) => {
  addOptionsToSelect(mySelectEmp(), list);
};

export const populateEmpSelectByStore = (selectedStore) => {
  populateEmpSelect(
    selectedStore
      ? getAgentsByShop(selectedStore)
      : getLocalAgents(),
  );
};

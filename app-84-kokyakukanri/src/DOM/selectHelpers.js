import { getLocalAgentsByShop, getLocalAgents } from '../backend/fetchEmployees';
import { mySelectEmp, mySelectShop } from './utilsDOM';

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
  addOptionsToSelect(mySelectShop(), getLocalShopList());
};

export const populateEmpSelect = (list = getLocalAgents()) => {
  addOptionsToSelect(mySelectEmp(), list);
};

export const populateEmpSelectByStore = (selectedStore) => {
  populateEmpSelect(
    selectedStore
      ? getLocalAgentsByShop(selectedStore)
      : getLocalAgents(),
  );
};

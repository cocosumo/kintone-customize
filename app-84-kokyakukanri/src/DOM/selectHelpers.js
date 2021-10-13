import { getLocalShopList } from '../backend/fetchShop';
import { getLocalAgentsList } from '../backend/fetchEmployees';

export const selectEmpID = 'my_selectEmp';
export const selectShopID = 'my_selectShop';

export const addOptionsToSelect = (selectId, list) => {
  const completeOptions = [
    ['【選択してください】', 'init'],
    ['全レコードを表示', 'listall'],
  ].concat(list.map((item) => ([item, item])));

  $(`#${selectId}`)
    .append(
      completeOptions.map(([text, val]) => new Option(text, val)),
    );
};

export const populateShopSelect = () => {
  addOptionsToSelect(selectShopID, getLocalShopList());
};

export const populateEmpSelect = (list = getLocalAgentsList()) => {
  addOptionsToSelect(selectEmpID, list);
};

import {getAgentsNamesByShop} from '../backend/fetchEmployees';
import {getLocalShops} from '../backend/fetchShop';
import {mySelectEmp, mySelectShop} from './utilsDOM';

export const selectEmpID = 'my_selectEmp';
export const selectShopID = 'my_selectShop';

/**
 * selectにoptionを追加する
 *
 * @param {HTMLElement} selectEl selectの要素
 * @param {string[]} list optionの値の配列
 * @returns {void}
 */
export const addOptionsToSelect = (selectEl, list) => {
  const completeOptions = [
    ['【選択してください】', 'init'],
    ['全レコードを表示', 'listall'],
  ].concat(list.map((item) => ([item, item])));

  $(selectEl)
    .empty()
    .append(
      completeOptions.map(([text, val]) => new Option(text, val)),
    );
};

/**
 * 店舗のselectにoptionを追加する
 *
 * @returns {void}
 */
export const populateShopSelect = () => {
  addOptionsToSelect(mySelectShop(), getLocalShops());
};

/**
 * 社員のselectにoptionを追加する
 *
 * @param {string} [selectedStore = null] 店舗名。指定しなかった場合、全部取得する。
 * @returns {void}
 */
export const populateEmpSelectByStore = (selectedStore = null) => {
  addOptionsToSelect(mySelectEmp(), getAgentsNamesByShop(selectedStore));
};

export const populateBothSelects = () => {
  populateShopSelect();
  populateEmpSelectByStore();
};

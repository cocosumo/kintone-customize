let viewCode; /* type=Number: 一覧のviewIDを格納する */

/**
 * 一覧表示画面において、現在のviewIDを取得する
 *
 * @param {number} code :一覧のviewID
 */
export const setViewCode = (code) => {
  viewCode = code;
};

/**
 * 設定した一覧のviewIDを取得する
 *
 * @returns {number} :一覧のviewID
 */
export const getViewCode = () => viewCode;

export const selectEmpID = 'my_selectEmp';
export const selectShopID = 'my_selectShop';
export const mySelectShop = () => document.getElementById(selectShopID);
export const mySelectEmp = () => document.getElementById(selectEmpID);

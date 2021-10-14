import ReactDOM from 'react-dom';
import {getHeaderMenuSpaceElement, isMobile} from '../../../kintone-api/api';
import FilterForm from './FilterForm';

import filterForm from './filterForm.html';
/*
  やり方はいろいろあります \o/。その一部、ここにご紹介致します。
  exportしているメソッドの目的はすべて一緒ですが、それぞれメリットとデメリットがあります。

  ざっくりと書きましたので、殆ど未テストです。ｗ

  そして、改行の課題ですが、
  もうMediaQueryを利用しているので、
  CSSでの対応したほうがいいと思いますが、一応いろいろなJSのやり方をご紹介致します。
*/

/*
1.  JQUeryでhtmlストリングそのままappendをする。 実行時間：36ms
*/
export const setHeaderMenuSpaceElementByString = () => {
  $(getHeaderMenuSpaceElement())
    .append(
      ` <div class='ListBoxGroup'>
        <div class='ShopListBox'>
          <label id='my_textShop'>店舗名: &nbsp;</label>
          <select id='my_selectShop'></select>
        </div>
        ${isMobile() ? '<br>' : '&nbsp;'}
        <div class='EmpListBox'>
          <label id='my_textEmp'>担当名: &nbsp;</label>
          <select id='my_selectEmp'></select>
        </div>
      </div>`,
    );
};

/* 2. JQUeryでhtmlファイルを利用する。実行時間：28ms */
export const setHeaderMenuSpaceElement = async () => {
  $(getHeaderMenuSpaceElement())
    .append(filterForm)
    .find('.ViewAdjustment')
    .css('display', isMobile() ? 'block' : 'none');
};

/* 3 なまのJSでselectを生成する。この関数の下のメソッドが利用しています。 */
const generateSelect = (containerName, labelName, selectName) => {
  const selectContainer = document.createElement('div');
  selectContainer.className = containerName;

  const selectLabel = document.createElement('label');
  selectLabel.id = labelName;

  const selectEl = document.createElement('select');
  selectEl.id = selectName;

  selectContainer.append(selectLabel, selectEl);

  return selectContainer;
};

/* 3 なまのJSで。実行時間：18ms */
export const setHeaderMenuSpaceElementByVanillaJS = () => {
  const kintoneHeader = getHeaderMenuSpaceElement();
  const formContainer = document.createElement('div');
  const divider = isMobile() ? document.createElement('br') : ' ';
  formContainer.className = 'ListBoxGroup';

  formContainer.append(
    generateSelect('ShopListBox', 'my_textShop', 'my_selectShop'),
    divider,
    generateSelect('EmpListBox', 'my_textEmp', 'my_selectEmp'),
  );

  kintoneHeader.append(formContainer);
};

/* 4. React 実行時間: 11ms */
export const setHeaderMenuSpaceElementByReact = () => {
  ReactDOM.render(
    <FilterForm />,
    getHeaderMenuSpaceElement(),
  );
};

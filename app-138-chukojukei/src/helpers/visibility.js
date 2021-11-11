import settings from './visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';


/**
 * フィールドコード[fieldsSettings]の選択した項目[choise]によって、
 * visibilitySettings.jsonに設定した通り、フィールドの表示/非表示を変更する
 * @param {String} fieldsSettings 対象のフィールドコード
 * @param {String} choice 選択した項目名
 * @param {Boolean} isReverse 表示の反転の確認 true=表示, false=非表示
 */
const resolveVisibility = (fieldsSettings, choice, isReverse = false) => {

  console.log('fieldsSettings[choice]', fieldsSettings[choice]);
  if (fieldsSettings[choice]) {
    Object.entries(fieldsSettings[choice])
      .forEach(([key, fields]) => {
        const isShow = key === 'show'; // key === 'show' ならtrue,違えばfalseが代入される
        const isVisible = isReverse ? !isShow : isShow;
        fields.forEach(fieldCode => {
          setFieldShown(fieldCode, isVisible);
          /* ★★★ 要検討 ★★★ */
          /* if (isVisible) {
            console.log('再起検討', fieldCode);
            // chkFieldShown(fieldCode); // 表示した項目の選択内容によって、再表示する項目がないか確認する
          } */
        });
      });
  } else {
    resolveVisibility(
      fieldsSettings,
      Object.keys(fieldsSettings)[0],
      true
    );
  }
};

/**
 * CALL元：onEditOrCreateHandler
 * 編集or作成画面で、フィールドの表示設定をする
 * @param {*} record アプリのレコード一覧
 */
export const setVisibility = (record) => {

  Object.entries(settings)
    .forEach(([fieldCode, fieldSettings]) => {
      const choice = record[fieldCode].value;
      resolveVisibility(fieldSettings, choice);
    });
};

/**
 * CALL元：onFieldChangeHandler
 * フィールドの内容を変更した際に、フィールドの表示を変更する
 * @param {string} param0 = fieldCode : 変更されたフィールドのフィールドコード
 * @param {string} param1 = choice : 選択した項目名
 */
export const setVisibilityByChangedField = ({fieldCode, choice}) => {
  resolveVisibility(settings[fieldCode], choice);
};
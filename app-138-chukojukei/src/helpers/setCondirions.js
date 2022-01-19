import {setFieldShown} from '../../../kintone-api/api';

/**
 * 起点となるフィールド値の変更に合わせて、
 * 対象のフィールドの値を連動して変更させる
 * @param {string} fieldCode : 対象のフィールドコード
 * @param {string} choice : ユーザーが選択した選択肢名
 */
export const setConditionInterlocking = (fieldCode, choice, record) => {
  // 「_101_01_甲区_所有権関係」が変更されたとき、「_101_02_甲区_所有権関係」も同じ値に設定する
  const changeFieldCode = fieldCode.replace('_01_', '_02_');
  record[changeFieldCode].value = choice;

  return record;
};

/**
 * 対象：チェックボックス
 * 特定の値が選択された時に、フィールドの表示を切り替える
 * @param {array} choice : 選択された項目の配列
 * @param {string} cause : フィールドの表示切り替え要因となる選択肢
 * @param {string} TargetField : 表示を切り替えるフィールド
 * @param {Boolean} isShown : choiceにcauseが含まれる場合の、TargetFieldのvisibleの設定値
 */
export const setVisibleChkBox = (choice, cause, TargetField, isShown = true) => {
  if (choice.indexOf(cause) !== -1) {
    setFieldShown(TargetField, isShown);
  } else {
    setFieldShown(TargetField, !isShown);
  }
};

/**
 * 対象：ラジオボタン
 * 特定の値が選択された時に、フィールドの表示を切り替える
 * @param {string} choice : 選択された項目
 * @param {string} cause : フィールドの表示切り替え要因となる選択肢
 * @param {string} TargetField : 表示を切り替えるフィールド
 * @param {Boolean} isShown : choiceにcauseが含まれる場合の、TargetFieldのvisibleの設定値
 */
export const setVisibleRadio = (choice, cause, TargetField, isShown = true) => {
  if (choice.indexOf(cause) !== -1) {
    setFieldShown(TargetField, isShown);
  } else {
    setFieldShown(TargetField, !isShown);
  }
};

/**
 *
 * @param {string} choice : 選択された項目
 * @param {string} cause : スペースフィールドの表示切り替え要因となる選択肢
 * @param {string} spaceID : 表示を切り替えるスペースフィールドのID
 */
export const setReplacement = (choice, cause, spaceID, TargetField, isShown = true) => {
  const spaceName = kintone.app.record.getSpaceElement(spaceID);
  if (choice.indexOf(cause) !== -1) {
    setFieldShown(TargetField, isShown);
    spaceName.parentNode.style.display = isShown ? 'none' : '';
  } else {
    setFieldShown(TargetField, !isShown);
    spaceName.parentNode.style.display = !isShown ? 'none' : '';
  }
};
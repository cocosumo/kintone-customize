
import settings from './visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';

let _record = {}; // モジュール範囲で定義。

/**
 *
 * @param {*} fieldsSettings
 * @param {string} choice, 選択肢に選択された値
 * @param {boolean} isReverse 選択肢の一番目の値の逆の設定のをする
 * @param {boolean} isForceHide 設定に問わず、強制に非表示
 *
 * @returns void
 */
const resolveVisibility = (fieldsSettings, choice, isReverse = false, isForceHide = false) => {

  if (fieldsSettings[choice]) {
    // 設定ファイルに[show/hide]があるとき、

    // hideやshowなどのプロパティ―をループする
    // 必要に応じて無効化やエラーメッセージなどのﾌﾟﾛﾊﾟﾃｨを追加出来るロジックになってます。

    Object.entries(fieldsSettings[choice])
      .forEach(([key, fields]) => {
        const isShow = key === 'show'; // キーはshowかどうか
        let isVisible = isReverse ? !isShow : isShow; // 逆の設定にするかどうか
        isVisible = isForceHide ? false : isVisible; // 強制に非表示にするかどう、(nestedの場合)

        // ﾌﾟﾛﾊﾟﾃｨないのフィールドの設定を適用する。
        fields.forEach(fieldCode => {
          const nested = settings[fieldCode];

          // 入れ子があるかどうかチェックする
          if (nested) {
            const isHideNest = isForceHide ? isForceHide : !isVisible; // 当要素は入れ子だと、ルート要素をもとに表示設定を適用する。
            resolveVisibility(nested, _record[fieldCode].value, false, isHideNest); // 再起、入れ子が検知されないまで。
          }

          setFieldShown(fieldCode, isVisible); // 表示設定
        });

      });
  } else {
    // 設定ファイルに[show/hide]が無かったとき、

    /*
    再起。これで選択が変わった際の表示・非表示を両方設定しなくても、一番目の設定の逆を適用
     */
    resolveVisibility(
      fieldsSettings,
      Object.keys(fieldsSettings)[0],
      true,
      isForceHide
    );
  }
};

/**
 * 設定ファイルのすべてを適用（量によって重いかもしれません）
 *
 * @param {object} record Kintoneのレコードオブジェクト
 * @returns void
 */

export const setVisibility = (record) => {
  _record = record;
  Object.entries(settings)
    .forEach(([fieldCode, fieldSettings]) => {
      const choice = record[fieldCode].value;
      resolveVisibility(fieldSettings, choice);
    });
};

/**
 * 変わったフィールドだけ、設定を適用。
 *
 * @param {object} event, kintoneの変更イベントオブジェクト
 * @returns void
*/
export const setVisibilityByChangedField = (event) => {
  const {
    record,
    changes: {field},
    type
  } = event;

  _record = record;

  const fieldCode = type.split('change.')[1];
  const choice = field.value;

  resolveVisibility(settings[fieldCode], choice);
};
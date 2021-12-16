
// import settings from './visibilitySettings.json';
import {setFieldShown} from '../../../kintone-api/api';

let __record = {}; // モジュール範囲で定義。
let __settings;

/**
 * フィールドコード[fieldsSettings]の選択した項目[choise]によって、
 * visibilitySettings.jsonに設定した通り、フィールドの表示/非表示を変更する
 * @param {*} fieldsSettings 対象のフィールドコード
 * @param {string} choice, 選択した項目名
 * @param {boolean} isReverse 表示の反転の確認。設定の一つ目の反転
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
        const isShow = key === 'show'; // フィールドは設定ファイルにshowになっているかどうか
        let isVisible = isReverse ? !isShow : isShow; // 逆の設定にするかどうか
        isVisible = isForceHide ? false : isVisible; // 強制に非表示にするかどう、(nestedの場合)

        // ﾌﾟﾛﾊﾟﾃｨないのフィールドの設定を適用する。
        fields.forEach(fieldCode => {
          const nested = __settings[fieldCode];

          // 入れ子があるかどうかチェックする
          if (nested) {
            const isHideNest = isForceHide ? isForceHide : !isVisible; // 当要素は入れ子だと、ルート要素をもとに表示設定を適用する。
            resolveVisibility(nested, __record[fieldCode].value, false, isHideNest); // 再起、入れ子が検知されないまで。
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
 * フィールドの表示設定をする
 *
 * @param {object} event, kintoneの変更イベントオブジェクト
 * @param {object} settings,
 * @returns void
 */

export const setVisibility = (event, settings) => {

  console.log(event);
  const {
    record,
    changes,
    type
  } = event;

  __record = record;
  __settings = settings;


  const isChange = type.includes('change.');

  if (isChange) {
    // 変更イベントの場合
    const {field} = changes;
    const fieldCode = type.split('change.')[1];
    const choice = field.value;
    resolveVisibility(__settings[fieldCode], choice);

  } else {
    // その他のイベント
    Object.entries(__settings)
      .forEach(([fieldCode, fieldSettings]) => {
        const choice = record[fieldCode].value;
        resolveVisibility(fieldSettings, choice);
      });
  }
};


/**
 * @deprecated
 * フィールドの内容を変更した際に、フィールドの表示を変更する
 *
 * @param {object} event, kintoneの変更イベントオブジェクト
 * @returns void
 *
*/
export const setVisibilityByChangedField = (event) => {
  const {
    record,
    changes: {field},
    type
  } = event;

  __record = record; // モジュールのconstructor

  const fieldCode = type.split('change.')[1];
  const choice = field.value;

  resolveVisibility(__settings[fieldCode], choice);
};
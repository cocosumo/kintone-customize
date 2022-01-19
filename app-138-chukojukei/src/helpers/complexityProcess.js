import {setConditionInterlocking, setVisibleChkBox, setReplacement} from './setCondirions';

export const complexityProcess = (event) => {

  const {
    record,
    changes,
    type
  } = event;

  const isChange = type.includes('change.');

  if (isChange) {
    // 変更イベントの場合
    const {field} = changes;
    const fieldCode = type.split('change.')[1];
    const choice = field.value;

    // Ⅰ-1-(1)-土地 : ラジオボタンが変更された際、Ⅰ-1-(2)-建物の値を連動させる
    if (fieldCode === '_101_01_甲区_所有権関係' || fieldCode === '_101_01_乙区_所有権関係') {
      setConditionInterlocking(fieldCode, choice, record);
    }

    // Ⅰ-3-9.建物の高さの制限 : 絶対高さ制限が選択された際の動作設定
    if (fieldCode === '_103_02_9') {
      setVisibleChkBox(choice, '4.絶対高さ制限', '_103_02_9_4sub1');
    }

    // Ⅰ-3-10.その他の建築制限 : 外壁後退距離制限, 敷地面積の制限が選択された際の動作設定
    if (fieldCode === '_103_02_10_1') {
      setVisibleChkBox(choice, '1.外壁後退距離制限', '_103_10_2_1sub1');
      setVisibleChkBox(choice, '2.敷地面積の制限', '_103_10_3_1sub2');
    }

    // Ⅱ-2. 未定のチェックボックスが選択された際の動作設定
    if (fieldCode.includes('_202_未定')) {
      const num = fieldCode.slice(-1);
      setReplacement(choice, '未定', 'spc_202_' + num, '_202_金額' + num, false);
    }

    // 配管有無によって、口径とスペースの表示を切り替える
    // '_112_配管01_1', '_112_配管03_1', '_112_配管04_1', '_112_配管05_1'
    if (fieldCode.includes('_112_配管0')) {
      const num = fieldCode.substr(8, 1);
      setReplacement(choice, '無', 'spc_112_0' + num, '_112_口径0' + num + '_1', false);
    }

    // 項目=無 -> 有に変更された際、配管・口径の1つめの表示を再設定する
    if (fieldCode.includes('_112_施設選択')) {
      if (record[fieldCode].value !== '無') {
        const num = fieldCode.slice(-1);
        let viewCond = true;
        if (record['_112_配管0' + num + '_1'].value === '有') {
          viewCond = false;
        }
        setReplacement(choice, '無', 'spc_112_0' + num, '_112_口径0' + num + '_1', viewCond);
      }
    }

  }
  return event;
};

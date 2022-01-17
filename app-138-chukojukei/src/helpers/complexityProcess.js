import {setConditionInterlocking, setVisibleRadio, setReplacement} from './setCondirions';

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


    if (fieldCode === '_101_01_甲区_所有権関係' || fieldCode === '_101_01_乙区_所有権関係') {
      setConditionInterlocking(fieldCode, choice, record);
    }

    if (fieldCode === '_103_02_9') {
      setVisibleRadio(choice, '4.絶対高さ制限', '_103_02_9_4sub1');
    }

    if (fieldCode === '_103_02_10_1') {
      setVisibleRadio(choice, '1.外壁後退距離制限', '_103_10_2_1sub1');
      setVisibleRadio(choice, '2.敷地面積の制限', '_103_10_3_1sub2');
    }

    if (fieldCode.includes('_202_未定')) {
      const num = fieldCode.slice(-1);
      setVisibleRadio(choice, '未定', '_202_金額' + num, false);
      setReplacement(choice, '未定', 'spc_202_' + num);
    }

    // 「12.飲用水・電気・ガスの供給施設および排水施設の整備状況」の設定
    // 配管有無によって、口径とスペースの表示を切り替える
    // 項目なしの時に、該当部分全部を非表示にする

  }

  return event;
};

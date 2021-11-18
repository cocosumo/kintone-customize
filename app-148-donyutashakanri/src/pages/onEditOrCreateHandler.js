import {setFieldShown} from '../../../kintone-api/api';
import {setVisibility} from '../helpers/visibility';

const onEditOrCreateHandler = ({record}) => {

  // 「適用年」と「適用月」から、「適用年月」を設定する
  console.log('record', record);

  setFieldShown('適用年月', false); // フィールド「適用年月」を非表示にする
  setFieldShown('ダミー', false);

  setVisibility(record);
  return {record};
};

export default onEditOrCreateHandler;

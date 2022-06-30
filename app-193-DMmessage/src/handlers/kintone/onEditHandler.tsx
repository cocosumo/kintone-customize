import buttonMotion from '../../helpers/buttonMotion';
import {buttonSetting, urlSetting} from '../../helpers/elementSetting';
import './onCreateHandler.css';

const onEditHandler = (event : kintone.types.SavedAppFields) => {
  console.log('onEdit Test');

  const urlInput = urlSetting(); // URL入力エリアの設置
  const getbtn = buttonSetting(); // ボタンの設置

  buttonMotion(getbtn, urlInput); // URLからメール本文を取得

  return event;
};

export default onEditHandler;
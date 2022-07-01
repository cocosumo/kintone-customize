import gettingUrl from '../gettingUrl';
import './onCreateHandler.css';

/**
 * 「レコードを追加する」際の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onCreateHandler = (event: kintone.types.SavedAppFields) => {
  console.log('onCreate Test');
  gettingUrl(event);

  return event;
};

export default onCreateHandler;
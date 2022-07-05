import gettingUrl from '../gettingUrl';

/**
 * 「レコードを追加する」際の処理
 * @param event kintoneアプリのフィールド
 * @returns kintoneアプリのフィールド
 */
const onCreateHandler = (event: IEvent) => {
  console.log('onCreate Test');
  gettingUrl(event);

  return event;
};

export default onCreateHandler;
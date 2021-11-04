/**
 * アプリ名 : お知らせ
 * 本番アプリID: 40
 * */

// import {KintoneRestAPIClient} from '@kintone/rest-api-client';
import {getRecordsByProxy} from './proxyAPI';

const app : string = '40';


export const getActiveAnnouncements = async () => {

  return getRecordsByProxy({
    app: app,
    query:
      `状態 in ("公開") and (
        (ラジオ＿投稿期間 in ("はい") and 日時＿開始 < TODAY() and 日時＿終了 > TODAY()) or
        (ラジオ＿投稿期間 in ("いいえ"))
        )`
  });
};
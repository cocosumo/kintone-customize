/**
 * アプリ名 : お知らせ
 * 本番アプリID: 40
 * */

// import {KintoneRestAPIClient} from '@kintone/rest-api-client';
import {getRecordsByProxy} from './proxyAPI';

const app : string = '40';

export const getAnnoucementsAppId = () : string => app;

export const getActiveAnnouncements = async () : Promise<Announcements> => {
  return getRecordsByProxy({
    app: app,
    query:
      `状態 in ("公開") and (
        (ラジオ＿投稿期間 in ("はい") and 日時＿開始 < TODAY() and 日時＿終了 > TODAY()) or
        (ラジオ＿投稿期間 in ("いいえ"))
        )`
  });
};

export const getGroupedAnnouncements = async (): Promise<GroupAnnouncements | undefined> => {

  return (await getActiveAnnouncements())
    ?.reduce<GroupAnnouncements>(({news, events}, curr) => {

    const {ドロップダウン＿種類: announcementType} = curr;

    if (announcementType.value === 'お知らせ') {
      news.push(curr);
    } else if (announcementType.value === 'イベント') {
      events.push(curr);
    }

    return {news, events};
  }, {news: [], events: []});
};
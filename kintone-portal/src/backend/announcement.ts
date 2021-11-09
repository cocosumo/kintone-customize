/**
 * アプリ名 : お知らせ
 * 本番アプリID: 40
 * */

// import {KintoneRestAPIClient} from '@kintone/rest-api-client';
import {IS_PRODUCTION, getDomain, openLinkOnNewTab} from '../../utils';
import {fetchRecords} from './fetchRecords';
import {getRecordsByProxy} from './proxyAPI';

const app : string = IS_PRODUCTION ? '40' : '18';


const requestBody : KintoneAPIBody = {
  app: app,
  query:
    `状態 in ("公開") and (
      (ラジオ＿投稿期間 in ("はい") and 日時＿開始 < TODAY() and 日時＿終了 > TODAY()) or
      (ラジオ＿投稿期間 in ("いいえ"))
      ) order by 日時＿開始 desc`
};

export const getAnnoucementsAppId = () : string => app;

export const getActiveAnnouncementsWithProxy = async () : Promise<Announcements> => {
  return getRecordsByProxy(requestBody);
};

export const getActiveAnnouncements = async () : Promise<Announcements> => {
  return (await fetchRecords(requestBody)).records;
};

export const getGroupedAnnouncements = async (): Promise<GroupAnnouncements | undefined> => {

  return (
    await getActiveAnnouncements()
  )?.reduce<GroupAnnouncements>(({news, events}, curr) => {

    const {ドロップダウン＿種類: announcementType} = curr;

    if (announcementType.value === 'お知らせ') {
      news.push(curr);
    } else if (announcementType.value === 'イベント') {
      events.push(curr);
    }

    return {news, events};
  }, {news: [], events: []});
};

/* Deprecated */
export const fetchFileURL = (fileKey: string) => {
  const url = `https://${getDomain()}/k/v1/file.json?fileKey=${fileKey}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.responseType = 'blob';
  xhr.onload = () => {
    if (xhr.status === 200) {
    // success

      const blob = new Blob([xhr.response], {type: xhr.response.type});
      const fileURL = window.URL || window.webkitURL;
      const blobURL = fileURL.createObjectURL(blob);
      openLinkOnNewTab(blobURL);
    }
    // error

    return '';
  };

  xhr.send();

};

export const fetchURLByFileKey = (fileKey: string) : Promise<any> => {
  const url = `https://${getDomain()}/k/v1/file.json?fileKey=${fileKey}`;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        const blob = new Blob([xhr.response], {type: xhr.response.type});
        const fileURL = window.URL || window.webkitURL;
        const blobURL = fileURL.createObjectURL(blob);
        resolve({URL: blobURL, type: xhr.response.type});
      }
      reject({
        status: this.status,
        statusText: xhr.statusText
      });

    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
};
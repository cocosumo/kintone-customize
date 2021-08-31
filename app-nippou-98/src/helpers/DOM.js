import { getAppId, isMobile } from '../../../kintone-api/api';

/* Consolidate both fcDate and fcEvent Objects
  in a function
*/
export const reduceEvent = (s) => {
  if (!s) return {};
  return {
    startTime: s.dateStr || s.startStr || null,
    endTime: s.endStr || null,
    actionType: s.title || null,
    actionDetails: s.extendedProps?.description || null,
  };
};

export const getValue = (selector) => {
  const prefix = selector.substring(0, 1);
  const s = selector.substring(1);
  let value;
  switch (prefix) {
    case '#':
      value = document.getElementById(s).value || document.getElementById(s).innerText;
      break;
    default:
  }
  return value;
};

export const deleteEventById = (baseArray, modifiedId) => {
  const modifiedArray = [...baseArray];

  const index = baseArray.findIndex(({ id }) => id === modifiedId);
  modifiedArray.splice(index, 1);

  return modifiedArray;
};

export const replaceEvent = (baseArray, newEvent, modifiedId) => {
  const newState = [
    ...deleteEventById(baseArray, modifiedId),
    newEvent,
  ];

  return newState;
};

export const scrollTo = (y) => {
  setTimeout(() => {
    window.scrollTo(0, y);
  }, 0);
};

export const redirectToRecordId = (id) => {
  const baseURL = 'https://rdmuhwtt6gx7.cybozu.com/k/';
  const appId = getAppId();
  const fullURL = isMobile()
    ? `${baseURL}m/${appId}/show?record=${id}#mode=edit`
    : `${baseURL}${appId}/show#record=${id}&mode=edit`;
  /*  const fullURL = `${baseURL}${appId}/show#record=${id}&mode=edit`; */

  window.location.replace(fullURL);
};

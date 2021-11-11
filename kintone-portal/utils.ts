import env from './env.json';

export const getDomain = () : string | null => {
  const url = /:\/\/([^/]+)/.exec(window.location.href);
  return url ? url[1] : '';
};

export const AUTH = env.token;
export const DOMAIN = env.domain;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PRODUCTION = getDomain()?.includes('rdmuhwtt6gx7');
export const isAndroid : boolean = /android/i.test(navigator.userAgent);

export const openLinkOnNewTab = (link : string) => {
  console.log('trick the browser to open new tab');
  const a = document.createElement('a');
  a.href = link;
  a.setAttribute('target', '_blank');
  a.click();
};

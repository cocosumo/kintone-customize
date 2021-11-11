import {AUTH, DOMAIN} from '../../utils';

export const getFileWithXHR = (fileKey: string) => {
  const url = `https://${DOMAIN}/k/v1/file.json?fileKey=${fileKey}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('X-Cybozu-API-Token', AUTH);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (xhr.status === 200) {
    // success
      const blob = new Blob([xhr.response]);
      const _url = window.URL || window.webkitURL;
      const blobUrl = _url.createObjectURL(blob);
      console.log(blobUrl);
    } else {
    // error
      console.log(xhr.responseText);
    }
  };
  xhr.send();

};


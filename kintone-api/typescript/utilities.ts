export const numberWithCommas = (x : string) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const zenToHan = (str : string) =>
  str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));

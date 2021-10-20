export const getStorageObj = (key) => JSON.parse(localStorage.getItem(key));

export const setStorageObj = (key, val) => localStorage.setItem(key, JSON.stringify(val));

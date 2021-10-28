import {getStorageObj, setStorageObj} from '../helpers';

export const DateTimeKey = 'app86日時'; // 日時の保存名(キー)

/**
 * 現在の時間のローカルストレージへの格納
 *
 * @returns {void}
 */
export const setLocalTimes = () => setStorageObj(DateTimeKey, (Date.now() / 1000));

/**
 * ローカルストレージから、APIデータ取得時間を取り出す
 *
 * @returns {number} :APIデータ取得時間
 */
export const getLocalTimes = () => getStorageObj(DateTimeKey);
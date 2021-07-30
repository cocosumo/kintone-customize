/*
 * get all records function by using offset sample program
 * Copyright (c) 2019 Cybozu
 *
 * Licensed under the MIT License
 */

/*
 * @param {Object} _params
 *   - app {String}: アプリID（省略時は表示中アプリ）
 *   - filterCond {String}: 絞り込み条件
 *   - sortConds {Array}: ソート条件の配列
 *   - fields {Array}: 取得対象フィールドの配列
 *   - limit {Number}: レコードの取得件数（省略時は絞り込み条件に合うレコードを全件取得する）
 * @return {Object} response
 *   - records {Array}: 取得レコードの配列
 */
const getRecords = (_params) => {
  console.log('関数呼び出し成功(getRecords)');
  const MAX_READ_LIMIT = 500;

  const params = _params || {};
  const app = params.app || kintone.app.getId();
  const { filterCond } = params;
  const { sortConds } = params;
  const limit = params.limit || -1;
  const offset = params.offset || 0;
  const { fields } = params;
  let mydata = params.data;

  if (!mydata) {
    mydata = {
      records: [],
    };
  }

  let willBeDone = false;
  let thisLimit = MAX_READ_LIMIT;
  // getRecords 関数の呼び出し側で、レコードの取得件数を指定された場合は
  // 取得件数を満たせば終了するように willBeDone を true にする
  if (limit > 0) {
    if (thisLimit > limit) {
      thisLimit = limit;
      willBeDone = true;
    }
  }

  const conditions = [];
  if (filterCond) {
    conditions.push(filterCond);
  }

  const sortCondsAndLimit = `${sortConds && sortConds.length > 0 ? ` order by ${sortConds.join(', ')}` : ''
  } limit ${thisLimit}`;
  const query = `${conditions.join(' and ') + sortCondsAndLimit} offset ${offset}`;
  const body = {
    app,
    query,
  };
  if (fields && fields.length > 0) {
    body.fields = fields;
  }
  return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body).then((resp) => {
    mydata.records = mydata.records.concat(resp.records);
    const myoffset = resp.records.length;
    if (limit > 0 && limit < myoffset) {
      willBeDone = true;
    }
    // 取得すべきレコードを取得したら終了する
    if (myoffset < thisLimit || willBeDone) {
      return mydata;
    }
    // 取得すべきレコードが残っている場合は、再帰呼び出しで残りのレコードを取得する
    return getRecords({
      app,
      filterCond,
      sortConds,
      limit: limit - myoffset,
      offset: offset + myoffset,
      fields,
      mydata,
    });
  });
};

export default getRecords;

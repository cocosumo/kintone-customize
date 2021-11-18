const getItems = (items : Table) => {
  const {value: rows} = items;

  return rows.map((
    {value: {
      種類: {value: type},
      ポイント: {value: points}
    }},
    index
  )=>{
    const indent = index === 0 ? '\t' : '\t\t\t';
    return `${indent} ${type} , ${points}pt`;
  }).join('\n');

};

const getAgents = (agents : Table, rowName : string) => {
  const {value: rows} = agents;

  const message = rows.map(({value: row}, index) => {
    const name = (row.ここすも担当者名 || row.ゆめてつ担当者名).value;
    const points = (row.ここすも個人ポイント || row.ゆめてつ個人ポイント).value;
    const indent = index === 0 ? '\t' : '\t\t\t\t\t';

    return `${indent} ${name} , ${points}pt`;
  }).join('\n');

  return message ? `${rowName}担当\t：` + message : '';
};

const generateMessage = (event : SaveFields) => {
  const {record, appId, recordId} = event;
  const {
    契約日: {value: contractDate},
    項目,
    ゆめてつ担当者,
    ここすも担当者
  } = record;

  return `
  太陽光＋蓄電池導入チャレンジキャンペーンです。

  日付\t\t\t：\t${contractDate}

  種類\t\t\t：${getItems(項目)}

  ※夢のおてつだい 60%：ここすも 40% で分配します
  --------------------------------

  ${getAgents(ゆめてつ担当者, 'ゆめてつ')}

  ${getAgents(ここすも担当者, 'こここすも')}


  詳細は下記URLを参照してください。
  https://rdmuhwtt6gx7.cybozu.com/k/${appId}/show#record=${recordId}
  `;

/*   return `
付帯収益バトル報告です。

日付\t\t：\t${contractDate}
契約者\t：\t${name}
種類\t\t：${getItems(items)}
金額\t\t：\t${numberWithCommas(amount)}円
担当\t\t：\t${getOfficers(officers)}

詳細は下記URLを参照してください。
https://rdmuhwtt6gx7.cybozu.com/k/${appId}/show#record=${recordId}
          `; */
};

export default generateMessage;

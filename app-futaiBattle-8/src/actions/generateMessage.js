import { numberWithCommas } from '../../../kintone-api/utilities';

const getOfficers = (officers) => officers.map(({ value: { 担当者名: { value: officer } } }) => officer).join(' と ');

const generateMessage = (event) => {
  const { record, appId, recordId } = event;
  const {
    契約日: { value: contractDate },
    契約者名: { value: name },
    種類_仕入先: { value: supplierType },
    ポイント: { value: points },
    仕入先業者: { value: supplierName },
    契約金額: { value: amount },
    担当者: { value: officers },
  } = record;

  return `
付帯収益バトル報告です。

日付\t\t：\t${contractDate}
契約者\t：\t${name}
種類\t\t：\t${supplierType}
ポイント\t：\t${points}
仕入先\t：\t${supplierName}
金額\t\t：\t${numberWithCommas(amount)}円
担当\t\t：\t${getOfficers(officers)}

詳細は下記URLを参照してください。
https://rdmuhwtt6gx7.cybozu.com/k/${appId}/show#record=${recordId}
          `;
};

export default generateMessage;

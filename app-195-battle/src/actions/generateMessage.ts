// import {numberWithCommas} from '../../../kintone-api/utilities';
import {KintoneEvent} from '../eventHandlers/onEditOrCreateSubmitSuccessHandler';

/*
const getOfficers = (officers) => officers.map(
  ({value: {担当者名: {value: officer}}}) => officer,
).join(' と ');
const getItems = (items) => items.map(
  ({
    value:
    {
      種類: {value: type},
      ポイント: {value: points},
      仕入先業者: {value: supplierName},
    },
  }, idx) => {
    const indent = idx === 0 ? '\t' : '\t\t\t';
    return `${indent} ${type} / ${points}pt / ${supplierName}`;
  },
).join('\n'); */

const generateMessage = (event: KintoneEvent) => {
  const {record, appId, recordId} = event;

  const {
    契約日: {value: contractDate},
    担当者: {value: agents},
    種類: {value: type},
    案件: {value: projects},
    ポイント: {value: points},

  } = record;

  const title = '[title](*)付帯収益バトル報告です(*)[/title]';
  const content = `
  契約日\t\t: \t${contractDate}
  担当者名\t: \t${agents
    .map(({value: {チーム: team, 担当者名: agName}}) => `${agName.value} (${team.value})`)
    .join('、')}
  種類\t\t: \t${type}
  ポイント\t: \t${points}
  お客様名\t: \t${projects.map(prj => prj.value.契約者名.value).join('、')}
  `;
  const link = `https://rdmuhwtt6gx7.cybozu.com/k/${appId}/show#record=${recordId}`;


  return `[info]${[title, content, link].join('\n')}[/info]`;
};

export default generateMessage;

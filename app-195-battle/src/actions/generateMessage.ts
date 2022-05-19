// import {numberWithCommas} from '../../../kintone-api/utilities';
import {format, parseISO} from 'date-fns';
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

  } = record;

  const title = '[title](*)行動量バトル(*)[/title]';
  const agentsPoints = agents
    .filter(item=>Boolean(item.value.担当者名.value))
    .map(({value: {チーム: team, 担当者名: agName, personal_point}}) => `${agName.value} (${team.value}) ${personal_point.value}pt`)
    .join('\n');
  const content = `契約日：${format(parseISO(contractDate), 'yyyy年M月d日')}

担当者[hr]${agentsPoints}[hr]

種類: ${type}
お客様名: ${projects.map(prj => prj.value.契約者名.value).join('、')}`;

  const link = `https://rdmuhwtt6gx7.cybozu.com/k/${appId}/show#record=${recordId}`;


  return `[info]${[title, content, link].join('\n')}[/info]`;
};

export default generateMessage;

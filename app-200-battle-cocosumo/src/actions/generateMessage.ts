// import {numberWithCommas} from '../../../kintone-api/utilities';
import {format, parseISO} from 'date-fns';
import {KintoneEvent} from '../eventHandlers/onEditOrCreateSubmitSuccessHandler';


const generateMessage = (event: KintoneEvent) => {
  const {record, appId, recordId} = event;

  console.log(event);

  const {
    行動日: {value: actionDate},
    てまき種類: {value: temakiType},
    配布エリア: {value: area},
    枚数: {value: count},
    担当者名: {value: agent}

    /*   契約日: {value: contractDate},
    担当者: {value: agents},
    種類: {value: type},
    案件: {value: projects}, */

  } = record;

  const title = '[title](*)ここすもてまき報告(*)[/title]';
  const content = `行動日：${format(parseISO(actionDate), 'yyyy年M月d日')}
[hr]
配布エリア:\n${area}
[hr]
てまき種類:\n${temakiType}
[hr]
枚数:\n${count}
[hr]
担当者名:\n${agent}`;

  const link = `https://rdmuhwtt6gx7.cybozu.com/k/${appId}/show#record=${recordId}`;


  return `[info]${[title, content, link].join('\n')}[/info]`;
};

export default generateMessage;

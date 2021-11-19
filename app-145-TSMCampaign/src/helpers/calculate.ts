
let _eventType = '';

interface RowValues {
  ゆめてつ担当者名?: kintone.fieldTypes.SingleLineText,
  ここすも担当者名?: kintone.fieldTypes.SingleLineText
}

interface Row {
  value: RowValues
}

const isEventInArray = (keyword : string[]) => keyword.some(el => _eventType.includes(el));
const isShouldReferToRatio = () => isEventInArray(['個人割合', 'submit', 'edit.show']);
const isShouldUpdateRatio = () => isEventInArray(['create.show', '店舗', 'ここすも担当者', 'ゆめてつ担当者']);


const countFilledAgentRows = (rows: Row[]) : number => {
  return rows.reduce((accu, curr) => {
    const {value: row} = curr;
    const agent = (row.ゆめてつ担当者名 || row.ここすも担当者名)?.value;
    return agent ? accu + 1 : accu;
  }, 0);
};

const setIndividualRowValues = (
  table : AgentsTable,
  tablePercent : number,
  totalPoints: number
) => {
  const {value: rows} = table;
  const agentCount = countFilledAgentRows(rows);
  const tableRatio = tablePercent / 100;

  rows.forEach(({value: row})=>{
    const individualRatio = row.ゆめてつ個人割合 || row.ここすも個人割合;
    const individualPoints = row.ゆめてつ個人ポイント || row.ここすも個人ポイント;
    const agent = (row.ゆめてつ担当者名 || row.ここすも担当者名)?.value;

    const agentPercent : number = isShouldReferToRatio() ? +individualRatio.value : (100 / agentCount);

    const agentRatio = agentPercent / 100;


    if (isShouldUpdateRatio()) {
      individualRatio.value = agent ? Math.round((agentPercent + Number.EPSILON) * 100) / 100 : 0;
    }

    individualPoints.value = agent ? Math.round((totalPoints * tableRatio * agentRatio + Number.EPSILON) * 100) / 100 : 0;
    individualPoints.disabled = true;

  });
};

export const getTotal = (table: Table, fieldName : string) : number => {
  const {value: rows} = table;
  const total : number = rows.reduce<number>((accu, curr)=> {
    const {value: row} = curr;
    const rowVal = row[fieldName].value || 0;
    return accu + +rowVal;
  }, 0);

  return total || 0;
};


export const recalculateAll = (event : SaveFields) => {
  const {record, type} = event;
  const {
    ゆめてつ担当者,
    ここすも担当者,
    項目,
    ここすも割合,
    ゆめてつ割合
  } = record;

  const totalPoints = getTotal(項目, 'ポイント');
  const yumetetsuTotal : number = getTotal(ゆめてつ担当者, 'ゆめてつ個人ポイント');
  const kokosumoTotal : number = getTotal(ここすも担当者, 'ここすも個人ポイント');
  const yumetetsuPercent : number = kokosumoTotal > 0 ? +ゆめてつ割合.value : 100;
  const cocosumoPercent : number = yumetetsuTotal > 0 ? +ここすも割合.value : 100;

  _eventType = type;

  setIndividualRowValues(ゆめてつ担当者, yumetetsuPercent, totalPoints);
  setIndividualRowValues(ここすも担当者, cocosumoPercent, totalPoints);
};


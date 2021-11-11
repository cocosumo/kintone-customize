

const setIndividualRatioByTable = (table : AgentsTable) => {
  const {value: rows} = table;
  const agentCount = rows.length;

  rows.forEach(({value})=>{
    const individualRatio = value.ゆめてつ個人割合 || value.ここすも個人割合;
    const individualPoints = value.ゆめてつ個人ポイント || value.ゆめてつ個人ポイント;
    const ratio = 100 / agentCount;
    individualRatio.value = Math.round((ratio + Number.EPSILON) * 100) / 100;


    console.log(individualPoints);
  });
  console.log(agentCount);
};

const getTotal = (table: Table, fieldName : string) : number => {
  const {value: rows} = table;
  const total = rows.reduce((accu, curr)=> {
    const {value: row} = curr;


    return accu;
  }, 0);
  console.log(table, fieldName);
  return 0;
};

export const recalculateAll = ({ゆめてつ担当者, ここすも担当者, 項目} : Fields) => {
  const totalPoints = getTotal(項目, 'ポイント');

  console.log('totalPoints', totalPoints);
  setIndividualRatioByTable(ゆめてつ担当者);
  setIndividualRatioByTable(ここすも担当者);
};


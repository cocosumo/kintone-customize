interface ratioValue{
  value: number
}

const errorMessage = (fieldName : string) => {
  return `${fieldName}の割合が100％を超えています。確認してください。`;
};

const isTotalRatioValidByTable = (table: AgentsTable) : boolean => {
  const {value: rows} = table;
  const totalRatio = rows.reduce((acc, curr) : number => {
    const row = curr.value;
    const ratio : ratioValue = row.ゆめてつ個人割合 || row.ここすも個人割合;


    return acc + +ratio.value;
  }, 0);

  return totalRatio <= 100;
};


export const ratioValidation = ({ゆめてつ担当者, ここすも担当者} : Fields) : string | null => {
  const isYumetetsuTableValid = isTotalRatioValidByTable(ゆめてつ担当者);
  const isCocosumoTableValid = isTotalRatioValidByTable(ここすも担当者);
  if (!isCocosumoTableValid) return errorMessage('ここすも担当者');
  if (!isYumetetsuTableValid) return errorMessage('ゆめてつ担当者');

  return null;
};

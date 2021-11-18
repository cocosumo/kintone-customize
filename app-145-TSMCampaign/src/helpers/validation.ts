import {getTotal} from './calculate';

interface ratioValue{
  value: number
}

interface ValidateRatioResult {
  isValid: boolean,
  totalRatio: number,
}

const ratioErrorMessage = (fieldName : string, totalNumber: number) => {
  return `${fieldName}テーブルの割合の合計は${totalNumber}%です。合計は100％になるよう訂正してください。`;
};

const validateRatio = (table: AgentsTable) : ValidateRatioResult => {
  const {value: rows} = table;
  const totalRatio = rows.reduce((acc, curr) : number => {
    const row = curr.value;
    const ratio : ratioValue = row.ゆめてつ個人割合 || row.ここすも個人割合;


    return acc + +ratio.value;
  }, 0);
  console.log(totalRatio);
  return {
    isValid: Math.round(totalRatio) === 100,
    totalRatio: totalRatio
  };
};


export const getValidationErrors = ({ゆめてつ担当者, ここすも担当者} : Fields) : string | null => {
  let error : string = '';

  const yumetetsuTotal : number = getTotal(ゆめてつ担当者, 'ゆめてつ個人ポイント');
  const kokosumoTotal : number = getTotal(ここすも担当者, 'ここすも個人ポイント');
  const yumetetsuRatioValidation = validateRatio(ゆめてつ担当者);
  const cocosumoRatioValidation = validateRatio(ここすも担当者);

  if (yumetetsuTotal && !yumetetsuRatioValidation.isValid) error += ratioErrorMessage('ゆめてつ担当者', yumetetsuRatioValidation?.totalRatio);
  if (kokosumoTotal && !cocosumoRatioValidation.isValid) error += ratioErrorMessage('ここすも担当者', cocosumoRatioValidation?.totalRatio);
  if ((yumetetsuTotal + kokosumoTotal) <= 0) error += '担当者を設定してください。';

  return error;
};


/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';

import { fetchFields, fetchMonthRecords } from '../../backend/fetchRecords';
import { getSpaceElement, isMobile, setFieldShown } from '../../../../kintone-api/api';
import CumContainer from '../../components/containers/CumContainer';

const getCumFields = async () => {
  const { properties } = await fetchFields();
  const cummulativeFields = Object
    .keys(properties)
    .filter((key) => key.includes('cum'))
    .map((key) => ({ code: properties[key].code, label: properties[key].label }));
  return cummulativeFields;
};

const getCummulative = async (record, fields) => {
  const {
    reportDate: { value: reportDateVal },
    employeeNumber: { value: employeeNumber },
  } = record;

  const { records: monthRecords } = await fetchMonthRecords(reportDateVal, employeeNumber);
  /* 各フィールドの値を取得 */
  return monthRecords.reduce((prev, curr) => {
    fields.forEach((item) => {
      const propCode = item.code;
      prev[propCode] = (prev[propCode] || 0) + (+curr[propCode].value || 0);
    });
    return prev;
  }, {});
};

const renderCumTotals = (cumTotals, cumFields, record) => {
  Object.entries(cumTotals).forEach(([fieldCode, value]) => {
    const { label } = cumFields.find(({ code }) => code === fieldCode);
    const field = record[fieldCode];
    ReactDOM.render(
      <CumContainer
        {...{
          field, fieldCode, label, value,
        }}
      />, getSpaceElement(fieldCode),
    );
  });
};

const hideFieldsOnMobile = (fields) => {
  if (isMobile()) {
    fields.forEach(({ code }) => {
      if (code.includes('hide')) {
        setFieldShown(code, false);
      }
    });
  }
};

export const displayCummulativeTotals = async (record) => {
  const cumFields = await getCumFields();
  const cumTotals = await getCummulative(record, cumFields);

  hideFieldsOnMobile(cumFields);
  renderCumTotals(cumTotals, cumFields, record);
};

const onDetailEditCreateHandler = async ({ record }) => {
  displayCummulativeTotals(record);
};

export default onDetailEditCreateHandler;

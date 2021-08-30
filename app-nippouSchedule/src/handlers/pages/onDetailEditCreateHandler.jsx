/* eslint-disable no-param-reassign */
import ReactDOM from 'react-dom';
import { Typography } from '@material-ui/core';
import { fetchFields, fetchMonthRecords } from '../../backend/fetchRecords';
import InfoContainer from '../../components/containers/InfoContainer';
import { getSpaceElement } from '../../../../kintone-api/api';

const getCumFields = async () => {
  const { properties } = await fetchFields();
  const cummulativeFields = Object.keys(properties).filter((item) => item.includes('cum'));
  return cummulativeFields;
};

const getCummulative = async (record, fields) => {
  const {
    reportDate: { value: reportDateVal },
    creator: { value: creatorVal },
  } = record;

  const { records: monthRecords } = await fetchMonthRecords(reportDateVal, creatorVal);
  return monthRecords.reduce((prev, curr) => {
    fields.forEach((item) => {
      prev[item] = (prev[item] || 0) + (+curr[item].value || 0);
    });
    return prev;
  }, {});
};

const renderCumTotals = (cumTotals) => {
  Object.entries(cumTotals).forEach(([key, value]) => {
    ReactDOM.render(
      <InfoContainer>
        <Typography sx={{ color: 'GrayText', fontSize: 12, textAlign: 'right' }}>
          今月累計
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'right' }}>
          {value}
        </Typography>
      </InfoContainer>,
      getSpaceElement(key),
    );
  });
};

const displayCummulativeTotals = async (record) => {
  const cumTotals = await getCummulative(record, await getCumFields());
  renderCumTotals(cumTotals);
};

const onDetailEditCreateHandler = async ({ record }) => {
  displayCummulativeTotals(record);
};

export default onDetailEditCreateHandler;

import { setFieldShown } from '../../../../kintone-api/api';
import renderApp from '../../components/roots/renderApp';
import { fetchReportOnDate } from '../../backend/fetchRecords';
import fetchSettings from '../../backend/fetchSettings';
import './body.css';
import { redirectToRecordId } from '../../helpers/DOM';

const DEBUG_MODE = false;

const initialize = ({ record }) => {
  const { reportDate, employeeNumber } = record;

  setFieldShown('plansTable', DEBUG_MODE);
  setFieldShown('reportTable', DEBUG_MODE);
  reportDate.disabled = !DEBUG_MODE;

  employeeNumber.disabled = !DEBUG_MODE;
};

const checkExistingRecord = async ({
  type, record: { reportDate, employeeNumber },
}) => {
  if (type.includes('create')) {
    const existingRecord = (
      await fetchReportOnDate(reportDate.value, employeeNumber.value)
    ).records[0];

    const isExist = Boolean(existingRecord);
    if (isExist) {
      const { $id: { value: existingRecordId } } = existingRecord;

      redirectToRecordId(existingRecordId);
      return false;
    }
  }
  return true;
};

const storeSettings = async (appID : number | null) => {
  const { 設定: { value: settings } } = (await fetchSettings(appID))?.records[0];
  if (!settings) return;

  settings.forEach(({ value: row }) => {
    const {
      設定名: { value: key },
      設定値: { value },
    } = row;

    localStorage.setItem(key, value);
  });
};

const onEditOrCreateHandler = async (event, appID: number | null = null) => {
  initialize(event);
  storeSettings(appID);
  if (await checkExistingRecord(event)) {
    renderApp(event);
  }

  return event;
};

export default onEditOrCreateHandler;

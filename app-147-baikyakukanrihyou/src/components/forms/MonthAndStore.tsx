import Stack from '@mui/material/Stack';
import YearMonthPicker from '../DatePickers/YearMonthPicker';
import {Dispatch, SetStateAction} from 'react';
import MultiSelect from '../select/MultiSelect';


const MonthAndStore = ({monthAndStore, setMonthAndStore, groupedRecords} : MonthAndStoreProps) => {

  const updateReportDate : Dispatch<SetStateAction<Date | null>> = (selectedDate) => {
    setMonthAndStore({...monthAndStore, ...{reportDate: selectedDate}});
  };

  const updateSelectedStores : Dispatch<SetStateAction<string[]>> = (selectedStores) => {
    setMonthAndStore({...monthAndStore, ...{stores: selectedStores}});
  };

  const isStoreSelected = Boolean(monthAndStore.stores.length);
  return (
    <Stack spacing={3} maxWidth={400}>
      <YearMonthPicker
        reportDate={monthAndStore.reportDate}
        setReportDate={updateReportDate}
      />
      <MultiSelect
        label="店舗"
        placeholder={isStoreSelected ? '店舗名' : '全店舗'}
        options={Object.keys(groupedRecords)}
        setOptions={updateSelectedStores}
      />
    </Stack>
  );
};

export default MonthAndStore;


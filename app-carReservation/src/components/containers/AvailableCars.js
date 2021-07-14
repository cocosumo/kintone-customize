import { useState } from 'react';
import { onFieldChange } from '../../../../kintone-api/api';
import Table from '../../../../kintone-api/components/UI/Table';
import getAvailableCars from '../../handlers/getAvailableCars';

const AvailableCars = () => {
  const [availableCars, setAvailableCars] = useState([]);

  const setAvailableCarHandler = (value) => {
    setAvailableCars(value);
    console.log(availableCars);
  };

  const onChangeTimeHandler = (event) => {
    const result = getAvailableCars(event);
    result.then(
      (value) => setAvailableCarHandler(value),
    );
    kintone.events.off(onFieldChange(['開始', '終了']));
    return event;
  };

  kintone.events.on(onFieldChange(['開始', '終了']), onChangeTimeHandler);

  return (
    <>
      <Table
        headers={['号車', '店舗']}
        rows={availableCars}
        emptyMessage="予約出来る車がありません。期間を変えてください。"
      />
    </>
  );
};

export default AvailableCars;

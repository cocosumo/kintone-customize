import { useState } from 'react';
import Message from '../../../../kintone-api/components/UI/Message';
import Table from '../../../../kintone-api/components/UI/Table';
import getConflictReservations from '../../helper/getConflictReservations';
import { onFieldChange } from '../../../../kintone-api/api';
import isValidTimeDuration from '../../helper/validations/isValidTimeDuration';
import { showInvalidDatesError } from '../../helper/showAlert';

const onChangeTriggers = onFieldChange(['開始', '終了', '店舗']);
const extractBasicCarDetails = ({ レコード番号, 号車, 店舗 }) => {
  const recordId = レコード番号 ? レコード番号.value : 0;
  return [recordId, 号車.value, 店舗.value];
};

const toArray = (record) => record.map(extractBasicCarDetails);

const AvailableCarsV2 = (props) => {
  const { allCars, initialRecord } = props;
  const [conflictReservations, setConflictReservations] = useState([]);
  const [selectedCar, setSelectedCar] = useState(extractBasicCarDetails(initialRecord));

  const updateAvailableCarsHandler = (event) => {
    const { record: availableCarsRecord } = event;
    const { 開始, 終了 } = availableCarsRecord;
    console.log(開始.value, 終了.value);
    const isValid = isValidTimeDuration(開始.value, 終了.value);
    if (isValid) {
      getConflictReservations(availableCarsRecord)
        .then((resp) => {
          setConflictReservations(resp.records);
          setSelectedCar(extractBasicCarDetails(availableCarsRecord));
        });
    } else {
      終了.value = 開始.value; // reset
      showInvalidDatesError();
    }

    return event;
  };

  const arrAllCars = toArray(allCars);
  const arrConflictReservations = toArray(conflictReservations);
  const arrAvailableCars = arrAllCars.filter(
    ([, mainCN]) => !arrConflictReservations.some(([, CN]) => mainCN === CN),
  );
  const arrOtherAvailableCars = arrAvailableCars.filter(([, CN]) => selectedCar[1] !== CN);
  const isSelectedCarAvailable = arrAvailableCars.some(([, CN]) => selectedCar[1] === CN);
  const isOtherCarsAvailable = arrOtherAvailableCars.length > 0;
  const isCarSelected = !!selectedCar[1];

  /*   console.log(selectedCar, selectedCar[1]);
  console.log(arrConflictReservations, 'conflict');
  console.log(arrAvailableCars, 'Available');
  console.log(arrOtherAvailableCars, 'OtherAvailable');
  console.log(isCarSelected); */

  kintone.events.off(onChangeTriggers);
  kintone.events.on(onChangeTriggers, updateAvailableCarsHandler);
  return (
    <>
      <Message isSuccess={isSelectedCarAvailable}>
        {isSelectedCarAvailable && <>【Success！】予約可能です。</>}
        {!isSelectedCarAvailable && isCarSelected && <>【Failed…】指定の期間で予約出来ません。</>}
        {!isSelectedCarAvailable && !isCarSelected && <>【Failed…】車を選択してください。</>}
        {isOtherCarsAvailable && (
          <>
            ※以下の車
            {isSelectedCarAvailable ? <>も</> : <>なら</>}
            予約可能です。
          </>
        )}
      </Message>
      {isOtherCarsAvailable && (
        <Table
          headers={['id', '号車', '店舗']}
          rows={arrOtherAvailableCars}
        />
      )}
    </>
  );
};

export default AvailableCarsV2;

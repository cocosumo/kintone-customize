import {useState} from 'react';
import Message from './../UI/Message';
import Table from '../../../../kintone-api/components/UI/Table';
import getConflictReservations from '../../helper/getConflictReservations';
import {onFieldChange} from '../../../../kintone-api/api';
import isValidTimeDuration from '../../helper/validations/isValidTimeDuration';
import {extractBasicCarDetails, toArray} from './../../helper/recordOperations';


// import {showInvalidDatesError} from '../../helper/showAlert';
import PropTypes from 'prop-types';


const onChangeTriggers = onFieldChange(['開始', '終了', '店舗']);


const AvailableCarsV2 = (props) => {
  const {allCars, initialRecord} = props;
  const [conflictReservations, setConflictReservations] = useState([]);
  const [selectedCar, setSelectedCar] = useState(extractBasicCarDetails(initialRecord));
  const [duration, setDuration] = useState({start: null, end: null});

  const updateAvailableCarsHandler = (event) => {
    const {
      record: availableCarsRecord,
    } = event;
    const {開始, 終了, 期間} = availableCarsRecord;
    console.log(開始.value, 終了.value, event);

    const isValid = isValidTimeDuration(開始.value, 終了.value);
    if (isValid) {
      getConflictReservations(availableCarsRecord)
        .then((resp) => {
          setConflictReservations(resp.records);
          setSelectedCar(extractBasicCarDetails(availableCarsRecord));
        });
    } else {

      // 終了.value = 開始.value;
      console.log('期間:', 期間);
    }

    setDuration({start: 開始.value, end: 終了.value});

    return event;
  };

  console.log('Conflict:', conflictReservations);

  const arrAllCars = toArray(allCars);
  const arrConflictReservations = toArray(conflictReservations);
  const arrAvailableCars = arrAllCars.filter(
    ([, mainCN]) => !arrConflictReservations.some(([, CN]) => mainCN === CN),
  );
  const arrOtherAvailableCars = arrAvailableCars.filter(([, CN]) => selectedCar[1] !== CN);
  const isSelectedCarAvailable = arrAvailableCars.some(([, CN]) => selectedCar[1] === CN);
  const isOtherCarsAvailable = arrOtherAvailableCars.length > 0;
  const isCarSelected = !!selectedCar[1];

  const isDurationEmpty = !(duration.start && duration.end);
  const isValidDuration = isValidTimeDuration(duration.start, duration.end);
  const isNoDuration = duration.start === duration.end;

  kintone.events.off(onChangeTriggers);
  kintone.events.on(onChangeTriggers, updateAvailableCarsHandler);

  return (
    <>

      {!isDurationEmpty && !isValidDuration &&
      <Message isSuccess={false}>
        {isNoDuration ? '終了日と開始日が一緒' : '終了日が開始日より前の日付'}
        になっています。終了日は開始日以降の日付を指定して下さい。
      </Message>
      }

      {isDurationEmpty &&
      <Message isSuccess={false}>
        期間を入力してください。
      </Message>
      }


      {isValidDuration &&
        <Message isSuccess={isSelectedCarAvailable}>
          {isSelectedCarAvailable && <>【Success！】予約可能です。</>}
          {!isSelectedCarAvailable && isCarSelected && <>指定の期間で予約出来ません。</>}
          {!isSelectedCarAvailable && !isCarSelected && <>車を選択してください。</>}
          {isOtherCarsAvailable && (
            <>
              ※以下の車
              {isSelectedCarAvailable ? <>も</> : <>なら</>}
              予約可能です。
            </>
          )}
        </Message>
      }

      {isValidDuration && isOtherCarsAvailable && (
        <Table
          headers={['id', '号車', '店舗']}
          rows={arrOtherAvailableCars}
        />
      )}
    </>
  );
};

export default AvailableCarsV2;


AvailableCarsV2.propTypes = {
  allCars: PropTypes.array,
  initialRecord: PropTypes.object
};
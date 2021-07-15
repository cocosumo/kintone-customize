import { useState } from 'react';
import { onFieldChange } from '../../../../kintone-api/api';
import Message from '../../../../kintone-api/components/UI/Message';
import Table from '../../../../kintone-api/components/UI/Table';
import getAvailableCars from '../../handlers/getAvailableCars';

const triggerFields = ['開始', '終了', '店舗'];

const AvailableCars = (props) => {
  const { initialCar } = props;
  const [availableCars, setAvailableCars] = useState([]);
  const [currentCar, setCurrentCar] = useState(initialCar);

  const onChangeTriggersHandler = (event) => {
    const { value: selectedCar } = event.record.号車;
    setCurrentCar(selectedCar);
    getAvailableCars(event).then(
      (value) => setAvailableCars(value),
    );

    kintone.events.off(onFieldChange(triggerFields));
    return event;
  };

  const otherAvaiableCars = availableCars.filter((car) => {
    console.log(car);
    return car[0] !== currentCar;
  });

  const isSelectedCarAvailable = availableCars.some((car) => car[0] === currentCar);
  const isOtherCarsAvailable = otherAvaiableCars.length > 0;

  const getMessage = () => {
    let msg = isSelectedCarAvailable ? '選択された車は予約可能です。' : '以上の期間で選択された車は予約出来ません。';
    msg += (otherAvaiableCars.length > 0) && `以下の車${isSelectedCarAvailable ? 'も' : 'なら'}予約出来ます。`;
    msg += (!isSelectedCarAvailable && !(otherAvaiableCars.length > 0)) ? '期間を変えてください。' : '';
    return msg;
  };

  kintone.events.on(onFieldChange(triggerFields), onChangeTriggersHandler);

  return (
    <>
      <Message>
        {isSelectedCarAvailable && <>選択された車は予約可能です。</>}
        {!isSelectedCarAvailable && <>以上の期間で選択された車は予約出来ません。</>}
        {isOtherCarsAvailable && (
        <>
          以下の車
          {isSelectedCarAvailable ? <>も</> : <>なら</>}
          予約出来ます。
        </>
        )}
      </Message>
      {otherAvaiableCars.length > 0 && (
      <Table
        headers={['号車', '店舗']}
        rows={otherAvaiableCars}
      />
      )}

    </>
  );
};

export default AvailableCars;

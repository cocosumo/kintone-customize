import FullCalendar, {DatesSetArg, EventInput, EventSourceInput} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import {useState, useEffect} from 'react';
import {fetchConflictByDate} from '../../../../backend/fetchReservations';
import {parseISO} from 'date-fns';
import './ReservationCalendar.css';

type FCDateRange = DatesSetArg | undefined

interface ReservationCalendarProps {
  cars: CarSelectInput[]
  dateRange : FCDateRange,
  setDateRange: (dateInfo: FCDateRange) => void
  selectedCar: string | null
}

export default function ReservationCalendar({
  cars,
  dateRange,
  setDateRange,
  selectedCar
}: ReservationCalendarProps) {

  const [reservations, setReservations] = useState<EventSourceInput>();

  useEffect(()=>{
    if (!dateRange) return;
    const {startStr, endStr} = dateRange;
    const isAllCarSelected = selectedCar === 'all' || !selectedCar;

    fetchConflictByDate(startStr, endStr, isAllCarSelected ? null : selectedCar).then(({records}: Records) => {
      setReservations(()=>{
        return records.map<EventInput>((record : kintone.types.SavedAppFields) => {
          const {
            申請者: {value: {name: applicant}},
            号車: {value: carNumber},
            店舗: {value: store},
            開始: {value: startTime},
            終了: {value: endTime}
          } = record;

          const carProps = cars.find(({carNumber: _carNumber})=> _carNumber === carNumber);
          const bgColor = carProps?.bgColor;
          const textColor = carProps?.textColor;

          return {
            title: `${store}-${carNumber}号車 ${applicant}`,
            start: parseISO(startTime),
            end: parseISO(endTime),
            color: bgColor,
            textColor: textColor
          };
        });
      });


    });

  }, [cars, dateRange, selectedCar]);

  return (
    <FullCalendar
      dayCellClassNames={['day-cell']}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      locale={jaLocale}
      fixedWeekCount={false}
      height="auto"
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      events={reservations}
      datesSet={(dateInfo) => setDateRange(dateInfo)}
    />
  );
}
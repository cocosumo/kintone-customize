import {DatesSetArg} from '@fullcalendar/react';

import {Box, Stack} from '@mui/material';
import {useState, useEffect} from 'react';
import fetchCars from '../../../backend/fetchCars';

import CarSelect from './CarSelect';
import ReservationCalendar from './ReservationCalendar';


export default function ReservationStatus() {

  const [dateRange, setDateRange] = useState<DatesSetArg>();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [cars, setCars] = useState<CarSelectInput[]>([]);

  useEffect(()=>{
    console.log('FIRED!');
    fetchCars()
      .then(({records}: CarAppRecords) => {
        setCars(records.map(({店舗, 号車, bgColor, textColor})=>{
          return {
            store: 店舗.value,
            carNumber: 号車.value,
            bgColor: bgColor.value,
            textColor: textColor.value
          };
        }));
      });
  }, []);

  const isCarsLoaded = cars.length > 0;

  return (
    <Box p={2}>
      <Stack direction="column" spacing={2} alignItems="center">
        <CarSelect {...{cars, setSelectedCar, selectedCar}} />
        {isCarsLoaded && <ReservationCalendar {...{cars, dateRange, selectedCar, setDateRange}} />}
      </Stack>
    </Box>
  );
}
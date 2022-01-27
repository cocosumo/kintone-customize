import {
  Divider,
  Grid,
  Typography,
  Stack,
  Button
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import CustomerRegistrationForm from '../../../forms/CustomerRegistrationForm';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useState} from 'react';
import AgentsForm from '../../../forms/AgentsForm';
import Notes from './Notes';


interface CRFProps {
  index: string | number,
  removeCustomerHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}

const defaultFormObject = {name: '', nameReading: '', age: 0, ageGuess: -1, gender: -1};


const CRF = ({index, removeCustomerHandler} : CRFProps) => {
  const isLinkedCustomer = index > 0;

  return (
    <Stack spacing={1}>
      <Divider />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h5">{`【契約者${+index + 1}】`}</Typography>
        {
          Boolean(index) &&
          <Button id={`${index}`} variant="contained" color="error" startIcon={<PersonRemoveIcon />} onClick={removeCustomerHandler}>
            削除
          </Button>
        }
      </Stack>
      <CustomerRegistrationForm {...{isLinkedCustomer}} />
    </Stack>
  );
};

export default function CustomerRegistration() {
  // const [customerCount, setCustomerCount] = useState<number>(6);
  const [customers, setCustomers] = useState([{...defaultFormObject}]);
  const maxCustomers = 3;

  const addCustomerHandler = () => {
    setCustomers(prev => ([...prev, {...defaultFormObject}]));
  };

  const removeCustomerHandler = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const index = +event.currentTarget.id;
    console.log(event.currentTarget.id);
    setCustomers(prev => {
      const reducedCustomers = [...prev];
      reducedCustomers.splice(index, 1);
      return reducedCustomers;

    });
  };

  const isMaxCustomers = customers.length >= maxCustomers;

  console.log(customers);
  return (
    <Grid container spacing={2} overflow="auto" justifyContent="center">
      <Grid item xs={12} p={2} sx={{backgroundColor: '#9CDAF9'}}>
        <Typography variant="h4">顧客登録（個人）</Typography>
      </Grid>
      <Grid item md={6} >
        {customers.map((_, i) => <CRF key={i} index={i} {...{removeCustomerHandler}} />)}
        {!isMaxCustomers &&
        <Button fullWidth variant="contained" color="success" startIcon={<PersonAddIcon />} onClick={addCustomerHandler}>
          契約者を追加する
        </Button>
        }

      </Grid>
      <Grid item md={3}>
        <AgentsForm />
      </Grid>
      <Grid item md={3}>
        <Notes />
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
      <Grid container item md={4} justifyContent="center">
        <Button size="large" variant="contained" color="primary" type="submit" startIcon={<SaveAltIcon />}>
          保存
        </Button>
      </Grid>
    </Grid>
  );
}
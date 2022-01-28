import {
  Grid,
  TextField,
  // /InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {Box} from '@mui/system';
import {useState} from 'react';
import SeparatedDatePicker from '../ui/datetimepickers/SeparatedDatePicker';

interface ContactFieldProps {
  label: string,
  isRequired?: boolean,
  placeholder?: string
}

interface CustomerRegistrationFormProps {
  isLinkedCustomer : boolean
}

const ContactField = ({
  label,
  isRequired = false,
  placeholder = '07014529898'
} : ContactFieldProps) => {
  const classification = ['契約者', '配偶者', '婚約者', '家「固定電話」', '子', '祖父母', '兄弟姉妹', '同居人', '会社（固定電話）', '法人担当者', 'その他'];
  return (
    <Grid item container p={1} spacing={2}>
      <Grid item md={6} >
        <TextField fullWidth required={isRequired} label={label} placeholder={placeholder} />
      </Grid>
      <Grid item md={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">詳細年齢不明な場合使用</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="詳細年齢不明な場合使用"
          >
            {classification.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}


          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default function CustomerRegistrationForm({isLinkedCustomer} : CustomerRegistrationFormProps) {
  const [isSameToMain, setIsSameToMain] = useState(true);

  const isHideDetails = isLinkedCustomer && isSameToMain;

  console.log(isLinkedCustomer);
  return (

    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth required label="氏名" placeholder="高橋　加奈" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth required label="氏名フリガナ" />
        </Grid>
        <Grid item xs={12} md={4} mb={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">性別</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              // value={age}
              label="性別"
            >
              <MenuItem value={10}>女性</MenuItem>
              <MenuItem value={20}>男性</MenuItem>
              <MenuItem value={30}>指定しない</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <SeparatedDatePicker />
        </Grid>
        {isLinkedCustomer &&
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox defaultChecked checked={isSameToMain} onClick={()=>setIsSameToMain(prev=> !prev)} />}
            label="住所と連絡先は【契約者１】と同じ"
          />
        </Grid>
        }

        {!isHideDetails &&
        <>
          <Grid item xs={12} >
            <TextField required label="郵便番号" placeholder="441-8124" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required label="住所" placeholder="愛知県豊川" />
          </Grid>
          <Grid item xs={12} mb={4}>
            <TextField fullWidth required label="住所（番地以降）" placeholder="１９番地１６　６１２" />
          </Grid>

          <ContactField label="電話番号１" isRequired />
          <ContactField label="電話番号2" />
          <ContactField label="メール" placeholder="cocosumo.rpa03@gmail.com" />
        </>
        }
      </Grid>

    </Box>

  );
}
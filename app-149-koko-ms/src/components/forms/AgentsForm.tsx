import {Divider, Stack, Typography} from '@mui/material';
import BasicSelect from '../ui/selects/BasicSelect';
import StoreSelect from '../ui/selects/StoreSelect';

const agentsSample : Options = [
  {key: '1', text: '鮎川義介'},
  {key: '2', text: '秋山定輔'},
  {key: '3', text: '安部磯雄'},
  {key: '4', text: '浅野長勲'},
  {key: '5', text: '雨宮敬次郎'},
  {key: '6', text: '安西徳兵衛'},
];


export default function AgentsForm() {
  return (

    <Stack spacing={2}>
      <Divider />
      <Typography variant="h5">【担当者情報】</Typography>
      <StoreSelect />
      <BasicSelect label="営業担当者1" options={agentsSample} required />
      <BasicSelect label="営業担当者2" options={agentsSample} helperText="営業担当者が2名いる場合選択してください。" />
      <BasicSelect label="ゆめてつAG1" options={agentsSample} />
      <BasicSelect label="ゆめてつAG2" options={agentsSample} helperText="営業担当者が2名いる場合選択してください。" />
    </Stack>

  );
}


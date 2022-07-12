import {TextField} from '@mui/material';

const TextSingle = ({Sentence}: Props) => {
  return (
    <TextField
      label={Sentence}
      size="small"
      sx={{
        width: '60%',
        margin: '4px',
        backgroundColor: '#ffffff',
        font: '#333333'
      }}
    />
  );
};
interface Props{
  Sentence: string
}

export default TextSingle;
import {Button} from '@mui/material';

const ButtonSpc = ({Sentence}: Props) => {
  return (
    <Button
      variant="outlined"
      sx={{
        fontSize: '16px',
        margin: '4px',
      }}
    >
      {Sentence}
    </Button>
  );
};
interface Props{
  Sentence: string
}

export default ButtonSpc;
import {Button} from '@mui/material';

const ButtonSpc = ({Sentence, onClick}: Props) => {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{
        fontSize: '12px',
        margin: '0px 8px 0px 0px',
      }}
    >
      {Sentence}
    </Button>
  );
};
interface Props{
  Sentence: string,
  onClick: VoidFunction
}

export default ButtonSpc;
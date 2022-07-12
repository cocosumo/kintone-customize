import {Box} from '@mui/material';

const InfoLabel = ({Sentence}: Props) => {
  return (
    <Box
      component="sub"
      p={1}
      sx={{
        flexGrow: 1,
        width: {sm: `calc(100% - 16px)`},
        color: '#333333',
        fontSize: '16px',
        margin: '4px',
      }}
    >
      {Sentence}
    </Box>
  );
};
interface Props{
  Sentence: string
}

export default InfoLabel;
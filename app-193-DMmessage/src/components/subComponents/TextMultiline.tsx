import {TextareaAutosize} from '@mui/material';

const TextMultiline = ({Sentence}: Props) => {
  console.log('マルチラインテキスト ::', Sentence);
  return (
    <>
      <TextareaAutosize
        maxRows={15}
        aria-label="maximum height"
        placeholder="ここにメールのHTMLソースが表示されます。"
        value={Sentence}
        style={{width: 500}}
      />
      {/* <TextField
      multiline
      label={Sentence}
      size="small"
      sx={{
        width: '60%',
        backgroundColor: '#ffffff',
        font: '#333333'
      }}
    /> */}
    </>
  );
};
interface Props {
  Sentence: string
}

export default TextMultiline;
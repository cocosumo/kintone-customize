// import {TextareaAutosize} from '@mui/material';
import {TextField} from '@mui/material';
import {ChangeEventHandler} from 'react';

interface Props {
  label: string
  Sentence: string
  viewOnly?: boolean
  onChange: ChangeEventHandler
}

const TextMultiline = ({label, Sentence, viewOnly = false, onChange}: Props) => {
  // console.log('マルチラインテキスト ::', Sentence);
  return (
    <>
      {/* <TextareaAutosize
        disabled={viewOnly}
        maxRows={15}
        aria-label="maximum height"
        placeholder="ここにメールのHTMLソースが表示されます。"
        value={Sentence}
        style={{width: 500}}
        onChange={onChange}
      /> */}
      <TextField
        disabled={viewOnly}
        multiline
        label={label}
        value={Sentence}
        size="small"
        rows={15}
        onChange={onChange}
        sx={{
          width: '500px',
          backgroundColor: '#ffffff',
          font: '#333333'
        }}
      />
    </>
  );
};

export default TextMultiline;
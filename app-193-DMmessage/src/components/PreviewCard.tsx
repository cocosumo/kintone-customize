import {Box, Typography} from '@mui/material';

interface Props {
  html: string
}

const PreviewCard = ({html}: Props) => {
  return (
    <>
      <Typography variant="caption" gutterBottom component="div">
        メール本文のプレビュー
      </Typography>
      <Box
        overflow="auto"
        sx={{
          width: 550,
          height: 350,
          border: '1px solid grey',
          borderColor: '#d8d8d8',
          borderRadius: '4px'
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />

      </Box>
    </>
  );
};

export default PreviewCard;
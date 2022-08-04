import {Box} from '@mui/material';

interface Props {
  html: string
}

const PreviewCard = ({html}: Props) => {
  return (
    <Box
      overflow="auto"
      sx={{
        width: 500,
        height: 350,
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />

    </Box>
  );
};

export default PreviewCard;
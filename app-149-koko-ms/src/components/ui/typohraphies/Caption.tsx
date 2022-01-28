import {Typography} from '@mui/material';

interface TypographyProps {
  text: string,
}

export default function Caption({text}:TypographyProps) {
  return (
    <Typography variant="caption">{text}</Typography>
  );
}
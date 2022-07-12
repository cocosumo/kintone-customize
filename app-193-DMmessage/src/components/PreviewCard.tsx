import {Card} from '@mui/material';

const PreviewCard = ({html}: Props) => {
  return (
    <Card variant="outlined">{html}</Card>
  );
};
interface Props {
  html: string
}

export default PreviewCard;
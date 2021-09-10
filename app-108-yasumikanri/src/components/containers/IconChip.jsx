import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const IconChip = ({ avatar, label }) => (
  <Chip
    avatar={(
      <Avatar
        alt="icon"
        src={avatar}
      />
)}
    label={label}
    color="primary"
    variant="outlined"
  />
);

export default IconChip;

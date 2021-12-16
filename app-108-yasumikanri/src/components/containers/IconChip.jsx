import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

const IconChip = ({avatar, label}) => (
  <Chip
    sx={{fontSize: 16}}
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


IconChip.propTypes = {
  avatar: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
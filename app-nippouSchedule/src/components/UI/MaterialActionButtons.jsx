import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const CustomButton = ({ sx, onClick, icon }) => (
  <IconButton
    sx={{ ...sx }}
    onClick={onClick}
  >
    {icon}
  </IconButton>
);

export const CloseButton = ({ onClick }) => (
  <CustomButton sx={{ ml: 4 }} onClick={onClick} icon={<CloseIcon fontSize="large" />} />
);

export const EditButton = ({ onClick }) => (
  <CustomButton onClick={onClick} icon={<EditIcon fontSize="large" />} />
);

export const DeleteButton = ({ onClick }) => (
  <CustomButton sx={{ ml: 4 }} onClick={onClick} icon={<DeleteIcon fontSize="large" />} />
);

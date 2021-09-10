import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

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

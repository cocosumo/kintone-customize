

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
  {icon: <FileCopyIcon />, name: 'コピー'},
  {icon: <SaveIcon />, name: '保存'},
  {icon: <PrintIcon />, name: '印刷'},
  {icon: <ShareIcon />, name: 'シェア'},
];

export default function ShortCuts() {
  return (

    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{position: 'fixed', bottom: 16, right: 16, zIndex: 3000}}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>

  );
}

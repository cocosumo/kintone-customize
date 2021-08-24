import * as React from 'react';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';

export const EventDetailsPopper = ({ id, open, anchorEl }) => (
  <Popper
    id={id}
    open={open}
    anchorEl={anchorEl}
    placement="bottom"
    disablePortal
    modifiers={[
      {
        name: 'flip',
        enabled: true,
        options: {
          altBoundary: true,
          rootBoundary: 'viewport',
          padding: 8,
        },
      },
      {
        name: 'preventOverflow',
        enabled: true,
        options: {
          altAxis: true,
          altBoundary: false,
          tether: true,
          rootBoundary: 'document',
          padding: 8,
        },
      },
    ]}
  >
    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
      The content of the Popper.
    </Box>
  </Popper>
);

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <EventDetailsPopper id={id} open={open} anchorEl={anchorEl} />
    </div>
  );
}

/* eslint-disable react/jsx-props-no-spreading */
import {
  Popper, Paper, Fade, Grid, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const DetailsPopper = ({
  id, detailsOpen, anchorEl, children, onCloseHandler,
}) => (

  <Popper
    id={id}
    open={detailsOpen}
    anchorEl={anchorEl}
    placement="right"
    style={{ zIndex: 1900 }}
    modifiers={[
      {
        name: 'flip',
        enabled: true,
        options: {
          fallbackPlacements: ['top', 'right', 'bottom'],
          padding: 8,
        },
      },
    ]}
    transition
  >

    {({ TransitionProps }) => (

      <Fade {...TransitionProps} timeout={350}>
        <Paper>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton onClick={onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Grid>
          {children}
        </Paper>
      </Fade>
    )}

  </Popper>
);

export default DetailsPopper;

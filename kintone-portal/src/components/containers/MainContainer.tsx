import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import {SxProps} from '@mui/system';

const style : SxProps = {
  py: 2
};

export const MainContainer = ({children}: Props) =>
  (
    <Container
      disableGutters
      maxWidth="xl"
      sx={style}
    >
      {children}
    </Container>
  );


MainContainer.propTypes = {
  children: PropTypes.node.isRequired
};
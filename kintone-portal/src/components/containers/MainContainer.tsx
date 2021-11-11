import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import {SxProps} from '@mui/system';
import BaseTheme from '../themes/base';

const style : SxProps = {
  py: 2
};

export const MainContainer = ({children}: Props) =>
  (
    <BaseTheme>
      <Container
        disableGutters
        maxWidth="xl"
        sx={style}
      >
        {children}
      </Container>
    </BaseTheme>
  );


MainContainer.propTypes = {
  children: PropTypes.node.isRequired
};
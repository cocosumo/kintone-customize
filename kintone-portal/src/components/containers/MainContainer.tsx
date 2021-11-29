import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

import BaseTheme from '../themes/base';

export const MainContainer = ({children}: Props) =>
  (
    <BaseTheme>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{py: 2}}
      >
        {children}
      </Container>
    </BaseTheme>
  );


MainContainer.propTypes = {
  children: PropTypes.node.isRequired
};
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types'; // ES6

type Props = {
  children: React.ReactNode
};

export const AccordionContainer = ({children} : Props) => {
  return (
    <Grid item xs md={6}>
      {children}
    </Grid>
  );
};

AccordionContainer.propTypes = {
  children: PropTypes.element
};
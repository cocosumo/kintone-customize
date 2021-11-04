import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Accordion} from './accordion/Accordion';


export const Portal = () => {
  return (
    <Container>
      <Grid container spacing={6}>
        <Accordion />
        <Accordion />
      </Grid>
    </Container>
  );
};
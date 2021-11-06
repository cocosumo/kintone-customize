import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {SxProps} from '@mui/system';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/system/Box';


const titleStyle : SxProps = {
  fontWeight: '600',
  letterSpacing: '7px',
  textAlign: 'center',
  fontSize: '24px',
  color: '#FFF'
};

const subtitleStyle : SxProps = {
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '3px',
  color: '#FFF'
};

const HR = () => {
  return <hr style={{border: '5px solid #F2E700'}} />;
};

export const AccordionContainer = ({title, subTitle, children} : TitledContainer) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      px={2}
      pb={1}
    >
      <Card>
        <Grid
          container
          alignItems="center"
          sx={{
            background: '#00417C'
          }}
        >
          <Grid item xs>
            <Box width="auto"><HR /></Box>
          </Grid>
          <Grid item xs>
            <CardHeader
              title={title}
              subheader={subTitle}
              titleTypographyProps={{sx: titleStyle}}
              subheaderTypographyProps={{sx: subtitleStyle}}

            />
          </Grid>
          <Grid item xs>
            <Box width="auto"><HR /></Box>
          </Grid>
        </Grid>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Grid>

  );
};

AccordionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  children: PropTypes.node
};
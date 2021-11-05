import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {SxProps} from '@mui/system';
import {CardContent} from '@mui/material';

const headerStyle : SxProps = {
  background: 'linear-gradient(90deg, rgba(237,219,8,1) 0%, rgba(253,255,161,1) 50%, rgba(237,219,8,1) 100%)'
};

const titleStyle : SxProps = {
  fontWeight: '600',
  letterSpacing: '0.5rem',
  textAlign: 'center',
  fontSize: '24px'
};

const subtitleStyle : SxProps = {
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '600'
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
        <CardHeader
          title={title}
          subheader={subTitle}
          titleTypographyProps={{sx: titleStyle}}
          subheaderTypographyProps={{sx: subtitleStyle}}
          sx={headerStyle}
        />
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